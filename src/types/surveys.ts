export interface SurveyOption {
  answer: string;
  points: number;
}

export interface SurveyQuestion {
  question: string;
  options: SurveyOption[];
}

export interface SurveyResult {
  header: string;
  body: string;
  score: number;
}

export interface Survey {
  id: string;
  surveyName: string;
  surveyQuestions: SurveyQuestion[];
  surveyResults: SurveyResult[];
}

export interface SurveyFormValues {
  id: string;
  createdBy: string;
  surveyName: string;
  surveyQuestions: SurveyQuestion[];
  surveyResults: SurveyResult[];
}
