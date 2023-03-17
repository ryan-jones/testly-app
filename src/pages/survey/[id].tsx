import SurveyQuestionsCard from '@/components/SurveyQuestionsCard';
import SurveyLayout from '@/components/Layouts/SurveyLayout';
import useSurvey from '@/hooks/useSurvey';
import { Survey } from '@/types/surveys';
import { Stack, Text } from '@chakra-ui/react';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { db } from '../../../firebase';
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
  const surveysRef = collection(db, 'surveys');
  const surveyQuery = query(surveysRef);
  const querySnapshot = await getDocs(surveyQuery);

  return {
    paths: querySnapshot.docs.map((doc) => ({ params: { id: doc.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  survey: Survey;
}> = async ({ params }) => {
  if (params?.id) {
    const surveyRef = doc(db, 'surveys', params.id as string);
    const querySnapshot = await getDoc(surveyRef);
    const survey = {
      ...(querySnapshot.data() as Omit<Survey, 'id'>),
      id: querySnapshot.id,
    };

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
