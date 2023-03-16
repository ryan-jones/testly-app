import QuestionnaireLayout from '@/components/QuestionnaireLayout';
import { Heading, Link } from '@chakra-ui/react';
import Head from 'next/head';

const QuestionnairePage = () => {
  return (
    <QuestionnaireLayout>
      <Heading>The Questionnaire Page</Heading>
      <Link href="/">Home</Link>
    </QuestionnaireLayout>
  );
};

export default QuestionnairePage;
