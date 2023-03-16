import { Card, Spinner } from '@chakra-ui/react';

const QuestionLoading = () => (
  <Card justifyContent="center" alignItems="center" padding={4}>
    <Spinner size="xl" />
  </Card>
);

export default QuestionLoading;
