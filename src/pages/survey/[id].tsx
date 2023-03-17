import SurveyCard from '@/components/SurveyCard';
import SurveyLayout from '@/components/Layouts/SurveyLayout';
import useGetQuestions from '@/hooks/useGetQuestions';
import { Survey } from '@/types/surveys';
import { Stack, Text } from '@chakra-ui/react';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { db } from '../../../firebase';

const SurveyPage = ({
  survey,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { currentQuestion, questionNumber, getNextQuestion, totalWeighting } =
    useGetQuestions(survey.surveyQuestions);

  const onClickSubmit = () => {
    console.log('totalWeighting', totalWeighting);
  };

  return (
    <SurveyLayout>
      <Stack
        spacing={8}
        padding={4}
        minHeight="50vh"
        justifyContent="center"
        alignItems="center"
      >
        <SurveyCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onClickNext={(weighting: number) => getNextQuestion(weighting)}
          onClickSubmit={onClickSubmit}
          isLastQuestion={questionNumber === survey.surveyQuestions.length}
        />
        <Text textColor="white">
          {`Question ${questionNumber} of ${survey.surveyQuestions.length}`}
        </Text>
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
