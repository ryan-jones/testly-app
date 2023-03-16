import { Answer } from '@/types/questions';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import RadioButtonGroup from './RadioButtonGroup';

interface QuestionnaireCardProps {
  question: string;
  answers: Answer[];
  onClickNext: (weighting: number) => void;
  onClickSubmit: () => void;
  isLastQuestion?: boolean;
}
const QuestionnaireCard = ({
  question,
  answers,
  onClickNext,
  onClickSubmit,
  isLastQuestion,
}: QuestionnaireCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  return (
    <Card maxWidth={{ base: '100%', md: '65%' }} minHeight="50vh" padding={4}>
      <CardHeader>
        <Heading as="h1" size="lg">
          {question}
        </Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <Stack spacing={8}>
          <RadioButtonGroup
            onChange={handleAnswerSelect}
            value={selectedAnswer}
            options={answers.map((answerOption: Answer) => ({
              label: answerOption.answer,
              value: answerOption.weighting.toString(),
            }))}
          />
          {isLastQuestion ? (
            <Button isDisabled={!selectedAnswer} onClick={onClickSubmit}>
              Find out your personality
            </Button>
          ) : (
            <Button
              isDisabled={!selectedAnswer}
              onClick={() => onClickNext(Number(selectedAnswer))}
            >
              Next question
            </Button>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default QuestionnaireCard;
