import BaseLayout from '@/components/BaseLayout';
import useGetSurveys from '@/hooks/useGetSurveys';
import { Survey } from '@/types/surveys';
import {
  Button,
  Card,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
} from '@chakra-ui/react';

const SurveySelectPage = () => {
  const { surveys, loading, error } = useGetSurveys();

  return (
    <BaseLayout title="Survey Select">
      <Stack spacing={12} height="100vh" alignItems="center" padding={12}>
        <Heading as="h1" size="xl">
          Get started with a survey!
        </Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
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
                <Heading color="white">{survey.surveyName}</Heading>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </BaseLayout>
  );
};

export default SurveySelectPage;
