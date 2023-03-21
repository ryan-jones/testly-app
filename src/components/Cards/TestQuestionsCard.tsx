import { TestOption } from '@/types/tests';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { KeyboardEvent, useEffect, useState } from 'react';
import RadioButtonGroup from '../RadioButtonGroup';

interface TestQuestionsCardProps {
  question: string;
  options: TestOption[];
  onClickNext: (points: number) => void;
  onClickPrevious: () => void;
  onClickSubmit: (points: number) => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  defaultSelectedAnswer: string;
}
const TestQuestionsCard = ({
  question,
  options,
  onClickNext,
  onClickPrevious,
  onClickSubmit,
  isFirstQuestion,
  isLastQuestion,
  defaultSelectedAnswer,
}: TestQuestionsCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    defaultSelectedAnswer
  );

  useEffect(
    () => setSelectedAnswer(defaultSelectedAnswer),
    [defaultSelectedAnswer]
  );

  const handleOptionSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleMoveToNextAnswer = () => {
    onClickNext(Number(selectedAnswer));
    setSelectedAnswer('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && selectedAnswer) {
      handleMoveToNextAnswer();
    }
  };
  return (
    <Card
      width={{ base: '100%', md: '60%' }}
      padding={4}
      data-test-id={`${question}-card`}
      onKeyDown={handleKeyDown}
    >
      <CardHeader>
        <Heading as="h1" size="lg">
          {question}
        </Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <Stack spacing={8}>
          <RadioButtonGroup
            onChange={handleOptionSelect}
            defaultValue={selectedAnswer}
            value={selectedAnswer}
            options={options.map((answerOption: TestOption) => ({
              label: answerOption.answer,
              value: answerOption.points?.toString(),
            }))}
          />
          <Stack
            justifyContent="flex-end"
            direction={{ base: 'column', sm: 'row' }}
          >
            {!isFirstQuestion && (
              <Button
                variant="outline"
                onClick={() => {
                  onClickPrevious();
                }}
              >
                Previous question
              </Button>
            )}
            {isLastQuestion ? (
              <Button
                isDisabled={!selectedAnswer}
                onClick={() => onClickSubmit(Number(selectedAnswer))}
                colorScheme="green"
              >
                Submit your answers
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                isDisabled={!selectedAnswer}
                onClick={handleMoveToNextAnswer}
              >
                Next question
              </Button>
            )}
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TestQuestionsCard;
