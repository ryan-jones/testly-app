export interface SurveyOption {
  answer: string;
  weighting: number;
}

export interface SurveyQuestion {
  question: string;
  options: SurveyOption[];
}

export interface Survey {
  id: string;
  surveyName: string;
  surveyQuestions: SurveyQuestion[];
}
