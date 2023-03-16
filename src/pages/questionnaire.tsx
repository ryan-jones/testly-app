import QuestionnaireLayout from '@/components/QuestionnaireLayout';
import useGetQuestions from '@/hooks/useGetQuestions';
import { Answer } from '@/types/questions';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Spinner,
  Stack,
} from '@chakra-ui/react';

const QuestionLoading = () => (
  <Card justifyContent="center" alignItems="center">
    <Spinner size="xl" />
  </Card>
);

const QuestionnairePage = () => {
  const { questions, loading } = useGetQuestions();

  return (
    <QuestionnaireLayout>
      {loading ? (
        <QuestionLoading />
      ) : (
        <Card maxWidth={{ base: '100%', md: '75%' }} height="60vh" padding={4}>
          <CardHeader>
            <Heading as="h1" size="lg">
              {questions[0].question}
            </Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Stack spacing={4}>
              {questions[0].answers.map((answerOption: Answer) => (
                <Button
                  key={answerOption.answer}
                  width="100%"
                  variant="outline"
                  textAlign="left"
                >
                  {answerOption.answer}
                </Button>
              ))}
            </Stack>
          </CardBody>
        </Card>
      )}
    </QuestionnaireLayout>
  );
};

export default QuestionnairePage;
