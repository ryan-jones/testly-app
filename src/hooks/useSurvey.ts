import { useCallback, useMemo, useRef, useState } from 'react';
import { Survey, SurveyQuestion, SurveyResult } from '@/types/surveys';

const useSurvey = (survey: Survey) => {
  const [result, setResult] = useState<SurveyResult | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<SurveyQuestion>(
    survey.surveyQuestions[0]
  );
  const questionNumberRef = useRef(0);

  const answers = useMemo(() => new Map(), []);

  const getNextQuestion = useCallback(
    (answer: number) => {
      answers.set(questionNumberRef.current, answer);
      questionNumberRef.current += 1;
      setCurrentQuestion(survey.surveyQuestions[questionNumberRef.current]);
    },
    [survey.surveyQuestions, answers]
  );

  const getPreviousQuestion = useCallback(() => {
    answers.set(questionNumberRef.current, 0);
    questionNumberRef.current -= 1;
    setCurrentQuestion(survey.surveyQuestions[questionNumberRef.current]);
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
    currentAnswer: answers.get(questionNumberRef.current)?.toString() || '',
    questionNumber: questionNumberRef.current + 1,
    getNextQuestion,
    getPreviousQuestion,
    getResult,
    surveyResult: result,
  };
};

export default useSurvey;
