import { SurveyFormProps } from '@/pages/admin';
import { SurveyOption, SurveyQuestion } from '@/types/surveys';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import SurveyQuestionOption from './SurveyQuestionOption';

const SurveyQuestions = ({ surveyQuestions }: any) => {
  return (
    <Stack>
      <Text>Survey Questions</Text>
      <FieldArray
        name="surveyQuestions"
        render={(arrayHelpers: FieldArrayRenderProps) => (
          <>
            <Accordion allowToggle>
              {surveyQuestions?.map((sq: SurveyQuestion, sqIndex: number) => (
                <AccordionItem key={sqIndex}>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {sqIndex + 1}: {sq.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Stack spacing={4}>
                      <InputControl
                        label="Survey Question"
                        name={`surveyQuestions[${sqIndex}].question`}
                      />
                      <FieldArray
                        name={`surveyQuestions[${sqIndex}].options`}
                        render={(sqArrayHelpers: FieldArrayRenderProps) => (
                          <>
                            {sq.options.map(
                              (_: SurveyOption, index: number) => (
                                <SurveyQuestionOption
                                  key={index}
                                  nameField={`surveyQuestions[${sqIndex}].options[${index}]`}
                                  onClickDelete={() => {
                                    sqArrayHelpers.remove(index);
                                  }}
                                />
                              )
                            )}
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
              onClick={() =>
                arrayHelpers.push({
                  question: '',
                  options: [],
                })
              }
            >
              Add a question
            </Button>
          </>
        )}
      />
    </Stack>
  );
};

export default SurveyQuestions;
