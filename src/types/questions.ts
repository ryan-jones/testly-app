export interface Answer {
  answer: string;
  weighting: number;
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
}
