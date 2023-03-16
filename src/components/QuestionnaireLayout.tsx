import { Box, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import BaseLayout from './BaseLayout';

interface QuestionnaireLayoutProps {
  children: ReactNode;
}
const QuestionnaireLayout = ({ children }: QuestionnaireLayoutProps) => {
  return (
    <BaseLayout title="Questionnaire">
      <Stack
        padding={8}
        height="100vh"
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-bl, green.200, pink.500)"
      >
        {children}
      </Stack>
    </BaseLayout>
  );
};

export default QuestionnaireLayout;
