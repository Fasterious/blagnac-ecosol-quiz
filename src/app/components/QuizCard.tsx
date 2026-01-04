"use client";

import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Question } from '../types';
import { THEME_COLORS } from '../constants';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  index: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onSwipe, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  
  // Opacity for overlay indicators
  const opacityRight = useTransform(x, [50, 150], [0, 1]);
  const opacityLeft = useTransform(x, [-50, -150], [0, 1]);
  const opacityUp = useTransform(y, [-50, -150], [0, 1]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe('left');
    } else if (info.offset.y < -swipeThreshold) {
      onSwipe('up');
    }
  };

  const themeStyle = THEME_COLORS[question.theme] || 'bg-gray-100 text-gray-800';

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-4 cursor-grab active:cursor-grabbing"
      style={{ x, y, rotate, zIndex: 50 - index }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-full max-h-[600px] flex flex-col pointer-events-auto select-none">
        
        {/* Swipe Overlays */}
        <motion.div style={{ opacity: opacityRight }} className="absolute top-8 left-8 z-20 border-4 border-green-500 rounded-lg px-4 py-2 transform -rotate-12">
          <span className="text-3xl font-black text-green-500 uppercase tracking-widest">D&apos;ACCORD</span>
        </motion.div>
        <motion.div style={{ opacity: opacityLeft }} className="absolute top-8 right-8 z-20 border-4 border-orange-500 rounded-lg px-4 py-2 transform rotate-12">
          <span className="text-3xl font-black text-orange-500 uppercase tracking-widest">PAS D&apos;ACCORD</span>
        </motion.div>
        <motion.div style={{ opacity: opacityUp }} className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 border-4 border-blue-500 rounded-lg px-4 py-2">
          <span className="text-2xl font-black text-blue-500 uppercase tracking-widest">NEUTRE</span>
        </motion.div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6 items-center justify-center text-center relative z-10">
          <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border ${themeStyle}`}>
            {question.theme}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-4 select-none">
            {question.text}
          </h2>
          <div className="w-16 h-1 bg-gray-200 rounded-full mt-4"></div>
        </div>

        {/* Instructions/Branding Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 font-medium shrink-0">
          <div className="flex items-center gap-1">
            <ThumbsDown size={14} /> Glisser gauche
          </div>
           <div className="flex items-center gap-1">
            Haut <Minus size={14} className="rotate-90" />
          </div>
          <div className="flex items-center gap-1">
            Glisser droite <ThumbsUp size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard;

