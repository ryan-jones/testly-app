import { useCallback, useRef, useState } from 'react';
import { SurveyQuestion } from '@/types/surveys';

const useGetQuestions = (surveyQuestions: SurveyQuestion[]) => {
  const [currentQuestion, setCurrentQuestion] = useState<SurveyQuestion>(
    surveyQuestions[0]
  );
  const [totalWeighting, setTotalWeighting] = useState(0);

  const questionNumber = useRef(0);

  const getNextQuestion = useCallback(
    (weighting: number) => {
      setTotalWeighting((prev) => prev + weighting);

      questionNumber.current += 1;
      setCurrentQuestion(surveyQuestions[questionNumber.current]);
    },
    [surveyQuestions]
  );

  return {
    currentQuestion,
    questionNumber: questionNumber.current + 1,
    getNextQuestion,
    totalWeighting,
  };
};

export default useGetQuestions;
