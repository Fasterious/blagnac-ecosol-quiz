"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, RefreshCw, Send, CheckCircle, ExternalLink, ChevronDown, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { TOTAL_QUESTIONS, questions } from '../constants';
import confetti from 'canvas-confetti';
import { supabase } from '../../lib/supabase';
import { AnswerRecord } from '../types';

interface ResultsProps {
  score: number;
  onRestart: () => void;
  sessionId?: number | null;
  answers: AnswerRecord[];
}

const Results: React.FC<ResultsProps> = ({ score, onRestart, sessionId, answers }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

  // Safety sync: On s'assure que le score final est bien enregistré
  useEffect(() => {
    if (sessionId) {
      supabase
        .from('quiz_results')
        .update({ score: percentage, answers: answers })
        .eq('id', sessionId)
        .then(() => console.log('Sync final terminé'));
    }
  }, [sessionId, percentage, answers]);
  
  // Determine profile
  let resultType: 'match' | 'good' | 'divergent';
  if (percentage >= 80) resultType = 'match';
  else if (percentage >= 50) resultType = 'good';
  else resultType = 'divergent';

  const config = {
    match: {
      color: '#16a34a', // green-600
      title: "C'est un Match ! 💚",
      message: "Vous êtes totalement en phase avec le programme EcoSol. Blagnac a besoin de vous !",
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200'
    },
    good: {
      color: '#2563eb', // blue-600
      title: "On est sur la bonne voie ! 🤔",
      message: "Vous partagez l'essentiel de nos valeurs pour un Blagnac plus vert et solidaire.",
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    divergent: {
      color: '#ea580c', // orange-600
      title: "Des avis divergents...",
      message: "C'est ça la démocratie ! Certaines de nos propositions pourraient quand même vous surprendre.",
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200'
    }
  };

  const activeConfig = config[resultType];

  useEffect(() => {
    if (percentage > 50) {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: [activeConfig.color, '#ffffff']
        });
      }, 300);
    }
  }, [percentage, activeConfig.color]);

  const handleShare = async () => {
    const text = `J'ai obtenu ${percentage}% de compatibilité avec le programme EcoSol Blagnac 2026 ! Fais le test toi aussi.`;
    const url = typeof window !== 'undefined' ? window.location.href : 'https://blagnac-ecosol-2026.fr';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz EcoSol Blagnac 2026',
          text: text,
          url: url,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      
      // Cas 1 : On a une session active, on met à jour la ligne existante
      if (sessionId) {
        try {
          const { error } = await supabase
            .from('quiz_results')
            .update({ email: email })
            .eq('id', sessionId);
          
          if (error) console.error("Erreur update email:", error);
          else console.log("Email associé au résultat !");
        } catch (err) {
          console.error("Erreur update:", err);
        }
      } 
      // Cas 2 (Fallback) : Pas de session (ex: coupure réseau au démarrage), on crée une nouvelle ligne
      else {
        try {
          await supabase.from('quiz_results').insert([
            { 
              score: percentage,
              answers: answers,
              email: email,
              device_info: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
            }
          ]);
          console.log("Email enregistré avec nouvelle ligne (fallback)");
        } catch(err) { 
          console.error("Erreur fallback insert:", err);
        }
      }
    }
  };

  const getAnswerDetails = (choice: string) => {
    switch (choice) {
      case 'agree': return { label: "D'accord", color: 'text-green-600', bg: 'bg-green-100', icon: <ThumbsUp size={14} /> };
      case 'disagree': return { label: "Pas d'accord", color: 'text-orange-500', bg: 'bg-orange-100', icon: <ThumbsDown size={14} /> };
      default: return { label: "Neutre", color: 'text-blue-500', bg: 'bg-blue-100', icon: <Minus size={14} /> };
    }
  };

  // SVG Configuration for the Gauge
  const size = 160;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] shadow-2xl w-full overflow-hidden p-8 flex flex-col items-center max-h-[85vh] overflow-y-auto">
        
        {/* Modern Circular Gauge */}
        <div className="relative w-40 h-40 mb-6 flex items-center justify-center shrink-0">
          <svg
            height={size}
            width={size}
            className="transform -rotate-90 overflow-visible"
          >
            {/* Background Ring */}
            <circle
              stroke="#f3f4f6"
              strokeWidth={strokeWidth}
              fill="transparent"
              r={radius}
              cx={center}
              cy={center}
            />
            {/* Progress Ring */}
            <motion.circle
              stroke={activeConfig.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx={center}
              cy={center}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          
          {/* Percentage Text centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
             <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-4xl font-black ${activeConfig.text} leading-none`}
             >
               {percentage}%
             </motion.span>
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mt-1"
             >
               Compatibilité
             </motion.span>
          </div>
        </div>

        <div className="text-center mb-8 shrink-0">
          <h2 className="text-2xl font-black text-gray-800 mb-2 tracking-tight">{activeConfig.title}</h2>
          <p className="text-gray-600 leading-relaxed font-medium">
            {activeConfig.message}
          </p>
        </div>

        {/* Email Capture - Compact */}
        {!isSubmitted ? (
          <form onSubmit={handleEmailSubmit} className="w-full mb-6 shrink-0">
            <div className="relative flex items-center">
              <input 
                type="email" 
                placeholder="Votre email pour la campagne" 
                className="w-full pl-4 pr-12 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-sm font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="absolute right-2 p-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Restons en contact (désinscription possible à tout moment)
            </p>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full mb-8 p-3 ${activeConfig.bg} ${activeConfig.text} rounded-xl flex items-center justify-center gap-2 text-sm font-bold shrink-0`}
          >
            <CheckCircle size={18} />
            <span>Bien reçu !</span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full shrink-0">
           <button 
            onClick={handleShare}
            className={`flex items-center justify-center gap-2 px-4 py-3.5 ${activeConfig.bg} ${activeConfig.text} border ${activeConfig.border} rounded-xl font-bold hover:brightness-95 transition-all text-sm`}
          >
            {copied ? <CheckCircle size={18} /> : <Share2 size={18} />}
            {copied ? 'Copié !' : 'Partager'}
          </button>
           <a 
            href="https://blagnac-ecosol-2026.fr/" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gray-100 text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm"
          >
            <ExternalLink size={18} />
            Programme
          </a>
        </div>

        {/* DETAILS SECTION - ACCORDION */}
        <div className="w-full mt-6 shrink-0">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-100 transition-colors"
          >
            <span>Voir mes réponses ({answers.length})</span>
            <ChevronDown size={18} className={`transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-2 pb-1 space-y-2">
                  {questions.map((q) => {
                    const userAnswer = answers.find(a => a.questionId === q.id);
                    if (!userAnswer) return null;
                    const style = getAnswerDetails(userAnswer.choice);
                    
                    return (
                      <div key={q.id} className="bg-white border border-gray-100 rounded-lg p-3 text-left shadow-sm">
                        <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">{q.theme}</p>
                        <p className="text-sm text-gray-800 font-medium leading-snug mb-2">{q.text}</p>
                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold ${style.bg} ${style.color}`}>
                          {style.icon}
                          <span>{style.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={onRestart}
          className="mt-8 text-gray-400 hover:text-gray-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0 pb-2"
        >
          <RefreshCw size={12} /> Recommencer
        </button>
      </div>
    </motion.div>
  );
};

export default Results;

