import SurveyQuestionsCard from '@/components/Cards/SurveyQuestionsCard';
import useSurvey from '@/hooks/useSurvey';
import { Survey } from '@/types/surveys';
import { Stack, Text } from '@chakra-ui/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getAllSurveyIds, getSurvey } from '../../../firebaseClient';
import SurveyResultCard from '@/components/Cards/SurveyResultCard';
import BaseLayout from '@/components/Layouts/BaseLayout';

const SurveyPage = ({
  survey,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    currentQuestion,
    questionNumber,
    getNextQuestion,
    getPreviousQuestion,
    getResult,
    surveyResult,
    currentAnswer,
  } = useSurvey(survey);

  return (
    <BaseLayout title="Survey">
      <Stack
        padding={{ base: 4, md: 8 }}
        height="100vh"
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-bl, green.200, blue.600)"
        spacing={8}
        width="100%"
      >
        {surveyResult ? (
          <SurveyResultCard result={surveyResult} />
        ) : (
          <>
            <SurveyQuestionsCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              onClickNext={(points: number) => getNextQuestion(points)}
              onClickPrevious={() => getPreviousQuestion()}
              onClickSubmit={(points: number) => getResult(points)}
              isFirstQuestion={questionNumber === 1}
              isLastQuestion={questionNumber === survey.surveyQuestions.length}
              defaultSelectedAnswer={currentAnswer}
            />
            <Text textColor="white">
              {`Question ${questionNumber} of ${survey.surveyQuestions.length}`}
            </Text>
          </>
        )}
      </Stack>
    </BaseLayout>
  );
};

export const getStaticPaths = async () => {
  const pathIds = await getAllSurveyIds();

  return {
    paths: pathIds.map((id) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  survey: Survey;
}> = async ({ params }) => {
  if (params?.id && typeof params.id === 'string') {
    const survey = await getSurvey(params.id);

    return {
      props: {
        survey,
      },
    };
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export default SurveyPage;
