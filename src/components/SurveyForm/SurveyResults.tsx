import { SurveyFormValues } from '@/pages/dashboard/surveys';
import { SurveyQuestion, SurveyResult } from '@/types/surveys';
import { parse } from '@/utils/formatters';
import { isString } from '@/utils/validators';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionItem,
  Box,
  Stack,
  AccordionPanel,
  Button,
  HStack,
  Text,
  FormLabel,
  StackDivider,
} from '@chakra-ui/react';
import {
  FieldArray,
  FieldArrayRenderProps,
  FormikContextType,
  useFormikContext,
} from 'formik';
import { NumberInputControl, TextareaControl } from 'formik-chakra-ui';
import ErrorMessage from '../Errors/ErrorMessage';
import InfoTooltip from '../Notifications/InfoTooltip';
import PrimaryField from './PrimaryField';
import SurveyAccordionButton from './SurveyAccordionButton';
import UneditableField from './UneditableField';

const getMaxScore = (questions: SurveyQuestion[]): number => {
  return questions.reduce((sum: number, question: SurveyQuestion) => {
    return sum + question.options.length;
  }, 0);
};
interface SurveyResultsProps {
  surveyResults: SurveyResult[];
}
const SurveyResults = ({ surveyResults }: SurveyResultsProps) => {
  const { setFieldValue, values, errors }: FormikContextType<SurveyFormValues> =
    useFormikContext();

  const maxScore = getMaxScore(values.surveyQuestions);

  return (
    <FieldArray
      name="surveyResults"
      render={(arrayHelpers: FieldArrayRenderProps) => (
        <Stack spacing={8}>
          <Text>Max Score: {maxScore} points</Text>
          <Accordion allowToggle>
            {surveyResults.map((sr: any, srIndex: number) => {
              const minScore = srIndex
                ? Number(surveyResults[srIndex - 1].score || 0) + 1
                : 1;

              return (
                <AccordionItem key={srIndex}>
                  <SurveyAccordionButton
                    index={srIndex}
                    field="surveyResults"
                    header={sr.header}
                  />

                  <AccordionPanel>
                    <Stack spacing={4} divider={<StackDivider />}>
                      <PrimaryField
                        label="Result Header"
                        name={`surveyResults[${srIndex}.header]`}
                        ariaLabel="Delete result"
                        onClick={() => arrayHelpers.remove(srIndex)}
                      />

                      <TextareaControl
                        label="Result Body"
                        name={`surveyResults[${srIndex}.body]`}
                      />
                      <Box>
                        <HStack spacing={2} alignItems="flex-start">
                          <FormLabel>Points Range</FormLabel>
                          <InfoTooltip label="Users whose point total is within this range will receive this result">
                            <InfoOutlineIcon />
                          </InfoTooltip>
                        </HStack>
                        <HStack>
                          <Box>
                            <UneditableField
                              name={`surveyResults[${srIndex}.score`}
                              label={'From'}
                              value={minScore}
                            />
                          </Box>
                          <Box>
                            <NumberInputControl
                              name={`surveyResults[${srIndex}.score`}
                              label={'To'}
                              showStepper={false}
                              numberInputProps={{
                                borderRadius: 'none',
                                min: minScore,
                                max:
                                  surveyResults.length < 2
                                    ? maxScore - 1
                                    : maxScore,
                                value: values.surveyResults[srIndex].score,
                                onChange: (valueString: string) => {
                                  setFieldValue(
                                    `surveyResults[${srIndex}].score`,
                                    parse(valueString)
                                  );
                                },
                              }}
                            />
                          </Box>
                        </HStack>
                      </Box>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
          <Button
            colorScheme="blue"
            isDisabled={
              surveyResults.length > 2
                ? surveyResults[surveyResults.length - 1].score === maxScore
                : false
            }
            onClick={() =>
              arrayHelpers.push({
                header: '',
                body: '',
                score: maxScore,
              })
            }
          >
            Add a result
          </Button>
          {isString(errors.surveyResults) && (
            <ErrorMessage errors={errors.surveyResults} />
          )}
        </Stack>
      )}
    />
  );
};

export default SurveyResults;
