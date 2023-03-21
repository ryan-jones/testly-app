import { TestFormValues, TestQuestion, TestResult } from '@/types/tests';
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
import TestAccordionButton from './TestAccordionButton';
import UneditableField from './UneditableField';

const getMaxScore = (questions: TestQuestion[]): number => {
  return questions.reduce((sum: number, question: TestQuestion) => {
    return sum + question.options.length;
  }, 0);
};
interface TestResultsProps {
  testResults: TestResult[];
}
const TestResults = ({ testResults }: TestResultsProps) => {
  const { setFieldValue, values, errors }: FormikContextType<TestFormValues> =
    useFormikContext();

  const maxScore = getMaxScore(values.testQuestions);

  return (
    <FieldArray
      name="testResults"
      render={(arrayHelpers: FieldArrayRenderProps) => (
        <Stack spacing={8}>
          <Text>Max Score: {maxScore} points</Text>
          <Accordion allowToggle>
            {testResults.map((sr: TestResult, srIndex: number) => {
              const minScore = srIndex
                ? Number(testResults[srIndex - 1].score || 0) + 1
                : 1;

              return (
                <AccordionItem key={srIndex}>
                  <TestAccordionButton
                    index={srIndex}
                    field="testResults"
                    header={sr.header}
                  />

                  <AccordionPanel>
                    <Stack spacing={4} divider={<StackDivider />}>
                      <PrimaryField
                        label="Result Header"
                        name={`testResults[${srIndex}.header]`}
                        ariaLabel="Delete result"
                        onClick={() => arrayHelpers.remove(srIndex)}
                      />

                      <TextareaControl
                        label="Result Body"
                        name={`testResults[${srIndex}.body]`}
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
                              name={`testResults[${srIndex}.score`}
                              label={'From'}
                              value={minScore}
                            />
                          </Box>
                          <Box>
                            <NumberInputControl
                              name={`testResults[${srIndex}.score`}
                              label={'To'}
                              showStepper={false}
                              numberInputProps={{
                                borderRadius: 'none',
                                min: minScore,
                                max:
                                  testResults.length < 2
                                    ? maxScore - 1
                                    : maxScore,
                                value: values.testResults[srIndex].score,
                                onChange: (valueString: string) => {
                                  setFieldValue(
                                    `testResults[${srIndex}].score`,
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
              testResults.length > 2
                ? testResults[testResults.length - 1].score === maxScore
                : false
            }
            onClick={() =>
              arrayHelpers.push({
                header: '',
                body: '',
                score: testResults.length >= 1 ? maxScore : maxScore - 1,
              })
            }
          >
            Add a result
          </Button>
          {isString(errors.testResults) && (
            <ErrorMessage errors={errors.testResults} />
          )}
        </Stack>
      )}
    />
  );
};

export default TestResults;
