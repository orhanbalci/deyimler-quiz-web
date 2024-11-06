export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestion: number;
  score: number;
  selectedAnswer: number | null;
  showResult: boolean;
}

export interface Proverb {
  proverb: string;
  options: string[];
  correct_meaning: string;
}
