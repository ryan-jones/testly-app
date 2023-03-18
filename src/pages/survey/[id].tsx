import SurveyQuestionsCard from '@/components/SurveyQuestionsCard';
import SurveyLayout from '@/components/Layouts/SurveyLayout';
import useSurvey from '@/hooks/useSurvey';
import { Survey } from '@/types/surveys';
import { Stack, Text } from '@chakra-ui/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getAllSurveyIds, getSurvey } from '../../../firebase';
import SurveyResultCard from '@/components/SurveyResultCard';

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
    <SurveyLayout>
      <Stack
        spacing={8}
        padding={4}
        minHeight="50vh"
        justifyContent="center"
        alignItems="center"
      >
        {surveyResult ? (
          <SurveyResultCard result={surveyResult} />
        ) : (
          <>
            <SurveyQuestionsCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              onClickNext={(weighting: number) => getNextQuestion(weighting)}
              onClickPrevious={() => getPreviousQuestion()}
              onClickSubmit={getResult}
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
    </SurveyLayout>
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
