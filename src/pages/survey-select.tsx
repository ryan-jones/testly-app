import BaseLayout from '@/components/Layouts/BaseLayout';
import { Survey } from '@/types/surveys';
import {
  Card,
  Heading,
  LinkOverlay,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { collection, getDocs, query } from 'firebase/firestore';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { db } from '../../firebase';

const SurveySelectPage = ({
  surveys,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <BaseLayout title="Survey Select">
      <Stack spacing={12} height="100vh" alignItems="center" padding={12}>
        <Heading as="h1" size="xl">
          Get started with a survey!
        </Heading>

        <SimpleGrid columns={2} width="60%" spacing={8}>
          {surveys.map((survey: Survey) => (
            <Card
              key={survey.id}
              height="30vh"
              padding={4}
              bgGradient="linear(to-bl, green.200, pink.500)"
              justifyContent="center"
              alignItems="center"
            >
              <LinkOverlay key={survey.id} href={`/survey/${survey.id}`}>
                <Heading color="white" textAlign="center">
                  {survey.surveyName}
                </Heading>
              </LinkOverlay>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps<{
  surveys: Survey[];
}> = async () => {
  const surveysCollection = collection(db, 'surveys');
  const surveysQuery = query(surveysCollection);
  const querySnapshot = await getDocs(surveysQuery);
  const surveys: Survey[] = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<Survey, 'id'>),
    id: doc.id,
  }));

  return {
    props: {
      surveys,
    },
  };
};

export default SurveySelectPage;
