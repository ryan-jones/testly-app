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

  const getResult = useCallback(
    (points: number) => {
      const totalPoints = [...Array.from(answers.values()), points].reduce(
        (sum: number, answer: number) => sum + answer,
        0
      );

      const surveyResultIndex = survey.surveyResults.findIndex(
        (surveyResult: SurveyResult, index: number) => {
          if (!index) {
            return totalPoints > 0 && totalPoints <= surveyResult.score;
          }

          return (
            totalPoints > survey.surveyResults[index - 1].score &&
            totalPoints <= surveyResult.score
          );
        }
      );
      console.log(
        'index and result',
        surveyResultIndex,
        survey.surveyResults[surveyResultIndex]
      );

      setResult(survey.surveyResults[surveyResultIndex]);
    },
    [survey.surveyResults, answers, survey.surveyQuestions]
  );

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
