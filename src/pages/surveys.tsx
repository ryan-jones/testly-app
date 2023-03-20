import SurveyLinkCard from '@/components/Cards/SurveyLinkCard';
import BaseLayout from '@/components/Layouts/BaseLayout';
import { Survey } from '@/types/surveys';
import {
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getAllSurveys } from '../../firebaseClient';

const SurveysPage = ({
  surveys,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BaseLayout title="Surveys">
      <Stack
        spacing={8}
        padding={8}
        minHeight="100vh"
        bgGradient="radial(blackAlpha.50, blackAlpha.200)"
      >
        <Heading>Choose a survey</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {surveys.map((survey: Survey) => (
            <SurveyLinkCard key={survey.id} survey={survey} />
          ))}
        </SimpleGrid>
      </Stack>
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  surveys: Survey[];
}> = async () => {
  const surveys: Survey[] = await getAllSurveys();

  return {
    props: {
      surveys,
    },
  };
};

export default SurveysPage;
