"use client";

import { motion } from 'framer-motion';
import { Question } from '../types';
import { THEME_COLORS } from '../constants';

interface QuizCardProps {
  question: Question;
  index: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, index }) => {
  const themeStyle = THEME_COLORS[question.theme] || 'bg-gray-100 text-gray-800';

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 50 - index }}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-full max-h-[500px] flex flex-col pointer-events-auto select-none">
        {/* Content */}
        <div className="flex-1 flex flex-col p-8 items-center justify-center text-center relative z-10">
          {/* Badge du Thème */}
          <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-8 border ${themeStyle}`}>
            {question.theme}
          </div>
          
          {/* Question Principale */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight select-none">
            {question.text}
          </h2>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard;

