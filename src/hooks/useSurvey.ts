import { useCallback, useMemo, useRef, useState } from 'react';
import { Survey, SurveyQuestion, SurveyResult } from '@/types/surveys';

const useSurvey = (survey: Survey) => {
  const [result, setResult] = useState<SurveyResult | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<SurveyQuestion>(
    survey.surveyQuestions[0]
  );

  const answers = useMemo(() => new Map(), []);

  const questionNumber = useRef(0);

  const getNextQuestion = useCallback(
    (answer: number) => {
      answers.set(questionNumber.current, answer);
      questionNumber.current += 1;
      setCurrentQuestion(survey.surveyQuestions[questionNumber.current]);
    },
    [survey.surveyQuestions, answers]
  );

  const getPreviousQuestion = useCallback(() => {
    answers.set(questionNumber.current, 0);
    questionNumber.current -= 1;
    setCurrentQuestion(survey.surveyQuestions[questionNumber.current]);
  }, [survey.surveyQuestions, answers]);

  const getResult = useCallback(() => {
    const totalWeighting = Array.from(answers.values()).reduce(
      (sum: number, answer: number) => sum + answer,
      0
    );
    let surveyResult: SurveyResult;
    if (totalWeighting < 0) {
      surveyResult = survey.surveyResults[0];
    } else if (totalWeighting <= 3) {
      surveyResult = survey.surveyResults[1];
    } else {
      surveyResult = survey.surveyResults[2];
    }
    setResult(surveyResult);
  }, [survey.surveyResults, answers]);

  return {
    currentQuestion,
    currentAnswer: answers.get(questionNumber.current)?.toString() || '',
    questionNumber: questionNumber.current + 1,
    getNextQuestion,
    getPreviousQuestion,
    getResult,
    surveyResult: result,
  };
};

export default useSurvey;
