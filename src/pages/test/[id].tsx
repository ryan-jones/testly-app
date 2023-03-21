import TestQuestionsCard from '@/components/Cards/TestQuestionsCard';
import { Test } from '@/types/tests';
import { Stack, Text } from '@chakra-ui/react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getTest, getUserProfileById } from '../../../firebaseClient';
import TestResultCard from '@/components/Cards/TestResultCard';
import BaseLayout from '@/components/Layouts/BaseLayout';
import useTest from '@/hooks/useTest';
import nookies from 'nookies';
import firebaseAdmin from '../../../firebaseAdmin';
import { UserProfile } from '@/types/user';
import { Page } from '@/types/pages';

const TestPage = ({
  test,
  userProfile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    currentQuestion,
    questionNumber,
    getNextQuestion,
    getPreviousQuestion,
    getResult,
    testResult,
    currentAnswer,
  } = useTest(test, userProfile);

  return (
    <BaseLayout title="Test">
      <Stack
        padding={{ base: 4, md: 8 }}
        height="100vh"
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-bl, green.200, blue.600)"
        spacing={8}
        width="100%"
      >
        {testResult ? (
          <TestResultCard result={testResult} />
        ) : (
          <>
            <Text textColor="white">
              {`Question ${questionNumber} of ${test.testQuestions.length}`}
            </Text>
            <TestQuestionsCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              onClickNext={(points: number) => getNextQuestion(points)}
              onClickPrevious={() => getPreviousQuestion()}
              onClickSubmit={(points: number) => getResult(points)}
              isFirstQuestion={questionNumber === 1}
              isLastQuestion={questionNumber === test.testQuestions.length}
              defaultSelectedAnswer={currentAnswer}
            />
          </>
        )}
      </Stack>
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  test: Test;
  userProfile: UserProfile | null;
}> = async (ctx: GetServerSidePropsContext) => {
  const { params } = ctx;
  if (params?.id && typeof params.id === 'string') {
    try {
      const test = await getTest(params.id);

      const firebaseToken = nookies.get(ctx).firebaseToken;

      if (!firebaseToken) {
        return {
          props: {
            test,
            userProfile: null,
          },
        };
      }

      const token = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
      const userProfile = await getUserProfileById(token.uid);

      return {
        props: {
          test,
          userProfile,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: Page.Login,
          permanent: false,
        },
      };
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export default TestPage;
