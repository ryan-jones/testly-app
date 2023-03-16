import QuestionLoading from '@/components/QuestionLoading';
import QuestionnaireCard from '@/components/QuestionnaireCard';
import QuestionnaireLayout from '@/components/QuestionnaireLayout';
import useGetQuestions from '@/hooks/useGetQuestions';
import { Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

const QuestionnairePage = () => {
  const { currentQuestion, loading, currentNumber } = useGetQuestions();
  const [totalWeighting, setTotalWeighting] = useState(0);

  const onClickNext = (weighting: number) => {
    setTotalWeighting((prev) => prev + weighting);
  };

  const onClickSubmit = () => {};

  return (
    <QuestionnaireLayout>
      <Stack
        spacing={8}
        padding={4}
        minHeight="50vh"
        justifyContent="center"
        alignItems="center"
      >
        {loading ? (
          <QuestionLoading />
        ) : (
          <>
            <QuestionnaireCard
              question={questions[0].question}
              answers={questions[0].answers}
              onClickNext={onClickNext}
              onClickSubmit={onClickSubmit}
            />
            <Text textColor="white">Question 1 of {questions.length}</Text>
          </>
        )}
      </Stack>
    </QuestionnaireLayout>
  );
};

export default QuestionnairePage;
