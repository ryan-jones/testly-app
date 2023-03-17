import { SurveyOption } from '@/types/surveys';
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

interface SurveyCardProps {
  question: string;
  options: SurveyOption[];
  onClickNext: (weighting: number) => void;
  onClickSubmit: () => void;
  isLastQuestion?: boolean;
}
const SurveyCard = ({
  question,
  options,
  onClickNext,
  onClickSubmit,
  isLastQuestion,
}: SurveyCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleOptionSelect = (value: string) => {
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
            onChange={handleOptionSelect}
            value={selectedAnswer}
            options={options.map((answerOption: SurveyOption) => ({
              label: answerOption.answer,
              value: answerOption.weighting.toString(),
            }))}
          />
          {isLastQuestion ? (
            <Button
              isDisabled={!selectedAnswer}
              onClick={onClickSubmit}
              colorScheme="green"
            >
              Submit your answers
            </Button>
          ) : (
            <Button
              colorScheme="blue"
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

export default SurveyCard;
