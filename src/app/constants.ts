import { Question, ThemeColors } from './types';
import { questions } from './data';

export const THEME_COLORS: ThemeColors = {
  'Démocratie': 'bg-purple-100 text-purple-800 border-purple-200',
  'Écologie': 'bg-green-100 text-green-800 border-green-200',
  'Social': 'bg-red-100 text-red-800 border-red-200',
  'Urbanisme': 'bg-amber-100 text-amber-800 border-amber-200',
  'Sécurité': 'bg-blue-100 text-blue-800 border-blue-200',
  'Mobilité': 'bg-cyan-100 text-cyan-800 border-cyan-200',
};

export const TOTAL_QUESTIONS = questions.length;

// Export questions with proper typing
export { questions };

