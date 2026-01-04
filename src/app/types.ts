export interface Question {
  id: number;
  theme: 'Démocratie' | 'Écologie' | 'Social' | 'Urbanisme' | 'Sécurité' | 'Mobilité';
  text: string;
  details: string;
}

export interface QuizState {
  screen: 'intro' | 'quiz' | 'results';
  currentQuestionIndex: number;
  score: number;
  answers: AnswerRecord[];
  emailCaptured: boolean;
  sessionId?: number | null;
}

export interface AnswerRecord {
  questionId: number;
  value: number; // 0, 0.5, or 1
  choice: 'disagree' | 'neutral' | 'agree';
}

export interface ThemeColors {
  [key: string]: string;
}

