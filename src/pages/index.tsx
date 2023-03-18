import BaseLayout from '@/components/Layouts/BaseLayout';
import { Survey } from '@/types/surveys';
import {
  Card,
  Heading,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getAllSurveys } from '../../firebase';

const SurveySelectPage = ({
  surveys,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <BaseLayout title="Survey Select">
      <Stack spacing={4}>
        <Stack
          spacing={12}
          height="50vh"
          alignItems="center"
          padding={12}
          backgroundColor="blue.600"
        >
          <Stack spacing={8} alignItems="center">
            <Heading as="h1" size="xl" color="white">
              Take online surveys and quizzes
            </Heading>
            <Heading color="white" size="lg">
              Free now. Free forever.
            </Heading>
          </Stack>
        </Stack>
        <Stack
          spacing={4}
          padding={12}
          alignItems="center"
          backgroundColor="green.600"
        >
          <Card
            width="60%"
            maxHeight="40vh"
            overflowY="scroll"
            padding={4}
            position="relative"
            zIndex={100}
            top={-40}
          >
            <SimpleGrid columns={2} spacing={8}>
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
          </Card>
          <Heading color="white" size="lg">
            Over 2 Users Worldwide since 2023
          </Heading>
        </Stack>
      </Stack>
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps<{
  surveys: Survey[];
}> = async () => {
  const surveys: Survey[] = await getAllSurveys();

  return {
    props: {
      surveys,
    },
  };
};

export default SurveySelectPage;
