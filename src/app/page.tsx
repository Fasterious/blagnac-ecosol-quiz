"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Heart, X, Meh } from "lucide-react";
import QuizCard from "./components/QuizCard";
import Results from "./components/Results";
import { questions, TOTAL_QUESTIONS } from "./constants";
import { QuizState, AnswerRecord } from "./types";

export default function Home() {
  const [gameState, setGameState] = useState<QuizState>({
    screen: 'intro',
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    emailCaptured: false,
  });

  const currentQuestion = questions[gameState.currentQuestionIndex];
  const progress = ((gameState.currentQuestionIndex) / TOTAL_QUESTIONS) * 100;

  const startQuiz = () => {
    setGameState(prev => ({ ...prev, screen: 'quiz' }));
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

    // Small delay to allow swipe animation to finish visually before state update
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        score: newScore,
        currentQuestionIndex: isFinished ? prev.currentQuestionIndex : nextIndex,
        screen: isFinished ? 'results' : 'quiz',
        answers: [...prev.answers, { questionId: currentQuestion.id, value: points, choice }]
      }));
    }, 200);
  };

  const restartQuiz = () => {
    setGameState({
      screen: 'intro',
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      emailCaptured: false,
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
              className="group relative px-8 py-4 bg-white text-emerald-800 rounded-full font-bold text-lg shadow-lg hover:bg-emerald-50 hover:scale-105 transition-all flex items-center gap-2"
            >
              Faire le quiz
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="mt-8 text-xs text-emerald-200/60">
              18 questions • ~3 minutes
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
            <div className="flex-1 relative w-full flex items-center justify-center min-h-0">
              <AnimatePresence mode='popLayout'>
                <QuizCard 
                  key={currentQuestion.id} 
                  question={currentQuestion} 
                  onSwipe={handleAnswer} 
                  index={gameState.currentQuestionIndex}
                />
              </AnimatePresence>
            </div>

            {/* Manual Controls */}
            <div className="h-28 shrink-0 px-8 pb-4 flex items-center justify-center gap-6 z-50">
               <button 
                onClick={() => handleAnswer('left')}
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-orange-500 hover:bg-orange-50 hover:scale-110 transition-all active:scale-95"
                aria-label="Pas d'accord"
               >
                 <X size={28} strokeWidth={3} />
               </button>
               <button 
                onClick={() => handleAnswer('up')}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all active:scale-95"
                aria-label="Neutre"
               >
                 <Meh size={20} />
               </button>
               <button 
                onClick={() => handleAnswer('right')}
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-green-500 hover:bg-green-50 hover:scale-110 transition-all active:scale-95"
                aria-label="D'accord"
               >
                 <Heart size={28} strokeWidth={3} fill="currentColor" className="text-green-500" />
               </button>
            </div>
          </>
        )}

        {/* Results Screen */}
        {gameState.screen === 'results' && (
          <Results score={gameState.score} onRestart={restartQuiz} />
        )}
        
      </div>
    </div>
  );
}
