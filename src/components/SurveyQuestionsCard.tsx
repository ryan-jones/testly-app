import { SurveyOption } from '@/types/surveys';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import RadioButtonGroup from './RadioButtonGroup';

interface SurveyQuestionsCardProps {
  question: string;
  options: SurveyOption[];
  onClickNext: (weighting: number) => void;
  onClickPrevious: () => void;
  onClickSubmit: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  defaultSelectedAnswer: string;
}
const SurveyQuestionsCard = ({
  question,
  options,
  onClickNext,
  onClickPrevious,
  onClickSubmit,
  isFirstQuestion,
  isLastQuestion,
  defaultSelectedAnswer,
}: SurveyQuestionsCardProps) => {
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

  return (
    <Card width={{ base: '100%', xl: '65%' }} padding={4}>
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
            options={options.map((answerOption: SurveyOption) => ({
              label: answerOption.answer,
              value: answerOption.weighting.toString(),
            }))}
          />
          <HStack justifyContent="flex-end">
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
                onClick={onClickSubmit}
                colorScheme="green"
              >
                Submit your answers
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                isDisabled={!selectedAnswer}
                onClick={() => {
                  onClickNext(Number(selectedAnswer));
                  setSelectedAnswer('');
                }}
              >
                Next question
              </Button>
            )}
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default SurveyQuestionsCard;