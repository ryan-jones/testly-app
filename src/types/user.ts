import { SurveyResult } from './surveys';

export interface UserType {
  email: string | null;
  uid: string | null;
}

export interface CompletedSurvey {
  surveyName: string;
  surveyResult: SurveyResult;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  completedSurveys: CompletedSurvey[];
}
