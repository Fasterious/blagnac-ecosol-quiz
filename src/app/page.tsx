"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import QuizCard from "./components/QuizCard";
import Results from "./components/Results";
import { questions, TOTAL_QUESTIONS } from "./constants";
import { QuizState, AnswerRecord } from "./types";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [authLoading, setAuthLoading] = useState(true);
  const [gameState, setGameState] = useState<QuizState>({
    screen: 'intro',
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    emailCaptured: false,
    sessionId: null,
  });

  // --- SÉCURITÉ : Authentification Anonyme au chargement ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Vérifie si l'utilisateur a déjà une session active
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          // Pas de session ? On le connecte en anonyme
          const { error } = await supabase.auth.signInAnonymously();
          if (error) {
            console.error('Erreur de connexion anonyme:', error);
          } else {
            console.log("Authentification anonyme réussie");
          }
        }
      } catch (err) {
        console.error("Erreur init auth:", err);
      } finally {
        // Une fois qu'on a essayé de connecter (ou qu'il l'est déjà), on réactive le bouton
        setAuthLoading(false);
      }
    };

    initAuth();
  }, []);

  const currentQuestion = questions[gameState.currentQuestionIndex];
  const progress = ((gameState.currentQuestionIndex) / TOTAL_QUESTIONS) * 100;

  // Fonction pour récupérer l'IP (Service externe car JS client ne peut pas la lire seul)
  const getIpAddress = async (): Promise<string | null> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (e) {
      console.warn("Impossible de récupérer l'IP", e);
      return null;
    }
  };

  const startQuiz = async () => {
    // 1. Update UI immédiatement pour la fluidité
    setGameState(prev => ({ ...prev, screen: 'quiz' }));

    // 2. Création de la ligne en base (L'auth est déjà gérée par le useEffect)
    try {
      const ip = await getIpAddress();
      
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([{ 
          device_info: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          ip_address: ip,
          score: 0,
          // user_id sera automatiquement rempli par Supabase (auth.uid())
        }])
        .select('id')
        .single();

      if (data) {
        console.log('Nouvelle session sécurisée créée, ID:', data.id);
        setGameState(prev => ({ ...prev, sessionId: data.id }));
      } else if (error) {
        console.error('Erreur init session (Détail):', JSON.stringify(error, null, 2));
        if (error.code === '42501') {
          console.warn("⚠️ ERREUR RLS: Vérifiez que l'utilisateur est bien authentifié (même anonymement).");
        }
      }
    } catch (err) {
      console.error('Erreur critique Supabase:', err);
    }
  };

  const handleAnswer = (direction: 'left' | 'right' | 'up') => {
    let points = 0;
    let choice: AnswerRecord['choice'] = 'neutral';

    if (direction === 'right') {
      points = 1;
      choice = 'agree';
    } else if (direction === 'up') {
      points = 0.5;
      choice = 'neutral';
    } else {
      points = 0;
      choice = 'disagree';
    }

    const newScore = gameState.score + points;
    const nextIndex = gameState.currentQuestionIndex + 1;
    const isFinished = nextIndex >= TOTAL_QUESTIONS;
    
    // Mise à jour de l'état local
    const newAnswer: AnswerRecord = { questionId: currentQuestion.id, value: points, choice };
    const newAnswersList = [...gameState.answers, newAnswer];

    // --- SAUVEGARDE PROGRESSIVE EN BASE ---
    if (gameState.sessionId) {
      // On construit le nom de la colonne dynamiquement : q1, q2, q3...
      const columnKey = `q${currentQuestion.id}`;
      
      // On prépare l'objet de mise à jour
      const updatePayload: any = {
        [columnKey]: choice, 
        score: Math.round((newScore / TOTAL_QUESTIONS) * 100), 
        answers: newAnswersList 
      };

      supabase
        .from('quiz_results')
        .update(updatePayload)
        .eq('id', gameState.sessionId)
        .then(({ error }) => {
          if (error) console.error(`Erreur sauvegarde ${columnKey}:`, JSON.stringify(error));
        });
    }

    // Update UI avec un petit délai pour l'animation
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        score: newScore,
        currentQuestionIndex: isFinished ? prev.currentQuestionIndex : nextIndex,
        screen: isFinished ? 'results' : 'quiz',
        answers: newAnswersList
      }));
    }, 150);
  };

  const restartQuiz = () => {
    // En remettant sessionId à null, le prochain "startQuiz" créera forcement une nouvelle ligne
    setGameState({
      screen: 'intro',
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      emailCaptured: false,
      sessionId: null, 
    });
  };

  return (
    <div className="h-[100dvh] bg-gradient-to-br from-emerald-600 to-teal-800 flex flex-col items-center justify-center overflow-hidden font-sans text-gray-900">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white blur-3xl mix-blend-overlay animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-300 blur-3xl mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-md h-full flex flex-col">
        
        {/* Intro Screen */}
        {gameState.screen === 'intro' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center text-white"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl mb-8">
              <span className="text-4xl mb-4 block">🗳️</span>
              <h1 className="text-4xl font-black mb-2 tracking-tight">EcoSol</h1>
              <h2 className="text-xl font-medium text-emerald-100 mb-6">Blagnac 2026</h2>
              
              <div className="pt-4 border-t border-white/20">
                <p className="text-xs font-bold text-emerald-200 uppercase tracking-widest mb-1">
                  Élections municipales
                </p>
                <p className="text-sm font-semibold text-white">
                  15 et 22 mars 2026
                </p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-emerald-50 mb-12 max-w-xs leading-relaxed">
              Découvrez si vous matchez avec notre programme pour une ville plus démocratique, écologique et solidaire.
            </p>

            <button 
              onClick={startQuiz}
              disabled={authLoading}
              className={`group relative px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all flex items-center gap-2 ${
                authLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-emerald-800 hover:bg-emerald-50 hover:scale-105'
              }`}
            >
              {authLoading ? (
                <>
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full mr-2"></span>
                  Chargement...
                </>
              ) : (
                <>
                  Faire le quiz
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <p className="mt-8 text-xs text-emerald-200/60">
              14 questions • ~2 minutes
            </p>
          </motion.div>
        )}

        {/* Quiz Screen */}
        {gameState.screen === 'quiz' && (
          <>
            {/* Header */}
            <div className="h-20 shrink-0 px-6 flex items-center justify-between z-50">
              <div className="flex flex-col">
                 <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">Question</span>
                 <span className="text-white font-bold text-lg">{gameState.currentQuestionIndex + 1} <span className="text-white/40">/ {TOTAL_QUESTIONS}</span></span>
              </div>
              <div className="h-2 w-24 bg-black/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Cards Container - Flex 1 to take remaining space */}
            <div className="flex-1 relative w-full flex items-center justify-center min-h-0 px-4">
              <AnimatePresence mode='popLayout'>
                <QuizCard 
                  key={currentQuestion.id} 
                  question={currentQuestion} 
                  index={gameState.currentQuestionIndex}
                />
              </AnimatePresence>
            </div>

            {/* Manual Controls - Tag Style Buttons */}
            <div className="w-full shrink-0 px-6 pb-8 pt-4 flex flex-col gap-3 z-50">
              <div className="grid grid-cols-2 gap-3">
                <motion.button 
                  onTap={() => handleAnswer('left')}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-orange-100 text-orange-600 border border-orange-200 shadow-sm hover:bg-orange-200 transition-colors"
                  aria-label="Pas d'accord"
                >
                  <ThumbsDown size={24} />
                  <span className="font-bold text-sm uppercase tracking-wide">Pas d&apos;accord</span>
                </motion.button>

                <motion.button 
                  onTap={() => handleAnswer('right')}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-green-100 text-green-600 border border-green-200 shadow-sm hover:bg-green-200 transition-colors"
                  aria-label="D'accord"
                >
                  <ThumbsUp size={24} />
                  <span className="font-bold text-sm uppercase tracking-wide">D&apos;accord</span>
                </motion.button>
              </div>

              <motion.button 
                onTap={() => handleAnswer('up')}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-100 text-blue-600 border border-blue-200 hover:bg-blue-200 transition-colors"
                aria-label="Neutre"
              >
                <Minus size={18} />
                <span className="font-bold text-sm">Neutre / Je ne sais pas</span>
              </motion.button>
            </div>
          </>
        )}

        {/* Results Screen */}
        {gameState.screen === 'results' && (
          <Results 
            score={gameState.score} 
            onRestart={restartQuiz}
            sessionId={gameState.sessionId}
            answers={gameState.answers}
          />
        )}
        
      </div>
    </div>
  );
}
