import { SurveyOption, SurveyQuestion } from '@/types/surveys';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import SurveyQuestionOption from './SurveyQuestionOption';

interface SurveyQuestionsProps {
  surveyQuestions: SurveyQuestion[];
}
const SurveyQuestions = ({ surveyQuestions }: SurveyQuestionsProps) => {
  return (
    <FieldArray
      name="surveyQuestions"
      render={(arrayHelpers: FieldArrayRenderProps) => (
        <Stack spacing={8}>
          <Accordion allowToggle>
            {surveyQuestions?.map((sq: SurveyQuestion, sqIndex: number) => (
              <AccordionItem key={`${sq.question}=${sqIndex}`}>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {sqIndex + 1}: {sq.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Stack spacing={4}>
                    <HStack alignItems="flex-end">
                      <InputControl
                        label="Survey Question"
                        name={`surveyQuestions[${sqIndex}].question`}
                      />
                      <IconButton
                        aria-label="Delete question"
                        onClick={() => arrayHelpers.remove(sqIndex)}
                        icon={<DeleteIcon />}
                      />
                    </HStack>
                    <FieldArray
                      name={`surveyQuestions[${sqIndex}].options`}
                      render={(sqArrayHelpers: FieldArrayRenderProps) => (
                        <>
                          {sq.options.map((_: SurveyOption, index: number) => (
                            <SurveyQuestionOption
                              key={`${_.answer}-${index}`}
                              nameField={`surveyQuestions[${sqIndex}].options[${index}]`}
                              onClickDelete={() => {
                                sqArrayHelpers.remove(index);
                              }}
                            />
                          ))}
                          <Button
                            width="25%"
                            alignSelf="flex-end"
                            onClick={() =>
                              sqArrayHelpers.push({
                                answer: '',
                                weighting: 0,
                              })
                            }
                          >
                            Add option
                          </Button>
                        </>
                      )}
                    />
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <Button
            colorScheme="blue"
            onClick={() =>
              arrayHelpers.push({
                question: '',
                options: [],
              })
            }
          >
            Add a question
          </Button>
        </Stack>
      )}
    />
  );
};

export default SurveyQuestions;
