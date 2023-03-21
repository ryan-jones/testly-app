import { useCallback, useMemo, useRef, useState } from 'react';
import { Test, TestQuestion, TestResult } from '@/types/tests';
import { UserProfile } from '@/types/user';
import { updateUserProfile } from '../../firebaseClient';

const useTest = (test: Test, userProfile: UserProfile | null) => {
  const [result, setResult] = useState<TestResult | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<TestQuestion>(
    test.testQuestions[0]
  );
  const questionNumberRef = useRef(0);

  const answers = useMemo(() => new Map(), []);

  const getNextQuestion = useCallback(
    (answer: number) => {
      answers.set(questionNumberRef.current, answer);
      questionNumberRef.current += 1;
      setCurrentQuestion(test.testQuestions[questionNumberRef.current]);
    },
    [test.testQuestions, answers]
  );

  const getPreviousQuestion = useCallback(() => {
    answers.set(questionNumberRef.current, 0);
    questionNumberRef.current -= 1;
    setCurrentQuestion(test.testQuestions[questionNumberRef.current]);
  }, [test.testQuestions, answers]);

  const getResult = useCallback(
    async (points: number) => {
      const totalPoints = [...Array.from(answers.values()), points].reduce(
        (sum: number, answer: number) => sum + answer,
        0
      );

      const testResultIndex = test.testResults.findIndex(
        (testResult: TestResult, index: number) => {
          if (!index) {
            return totalPoints > 0 && totalPoints <= testResult.score;
          }

          return (
            totalPoints > test.testResults[index - 1].score &&
            totalPoints <= testResult.score
          );
        }
      );

      const testResult = test.testResults[testResultIndex];

      setResult(testResult);

      if (userProfile) {
        await updateUserProfile({
          ...userProfile,
          completedTests: [
            ...userProfile.completedTests,
            {
              testName: test.testName,
              testResult,
            },
          ],
        });
      }
    },
    [test.testResults, answers, userProfile, test.testName]
  );

  return {
    currentQuestion,
    currentAnswer: answers.get(questionNumberRef.current)?.toString() || '',
    questionNumber: questionNumberRef.current + 1,
    getNextQuestion,
    getPreviousQuestion,
    getResult,
    testResult: result,
  };
};

export default useTest;
