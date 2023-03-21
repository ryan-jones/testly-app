import { TestFormValues, TestOption, TestQuestion } from '@/types/tests';
import { checkForMatchKeys } from '@/utils/validators';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Button,
  FormLabel,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import {
  FieldArray,
  FieldArrayRenderProps,
  FormikContextType,
  useFormikContext,
} from 'formik';
import ErrorMessage from '../Errors/ErrorMessage';
import PrimaryField from './PrimaryField';
import TestAccordionButton from './TestAccordionButton';
import TestQuestionOption from './TestQuestionOption';

interface TestQuestionsProps {
  testQuestions: TestQuestion[];
}
const TestQuestions = ({ testQuestions }: TestQuestionsProps) => {
  const { errors, touched }: FormikContextType<TestFormValues> =
    useFormikContext();

  return (
    <FieldArray
      name="testQuestions"
      render={(arrayHelpers: FieldArrayRenderProps) => (
        <Stack spacing={8}>
          <Accordion allowToggle>
            {testQuestions?.map((sq: TestQuestion, sqIndex: number) => (
              <AccordionItem key={sqIndex}>
                <TestAccordionButton
                  index={sqIndex}
                  header={sq.question}
                  field="testQuestions"
                />

                <AccordionPanel>
                  <Stack spacing={4} divider={<StackDivider />}>
                    <PrimaryField
                      label="Test Question"
                      name={`testQuestions[${sqIndex}].question`}
                      ariaLabel="Delete question"
                      onClick={() => arrayHelpers.remove(sqIndex)}
                    />
                    <Stack spacing={4}>
                      <FormLabel>Answers (minimum of 2)</FormLabel>
                      <FieldArray
                        name={`testQuestions[${sqIndex}].options`}
                        render={(sqArrayHelpers: FieldArrayRenderProps) => (
                          <>
                            {sq.options.map((_: TestOption, index: number) => (
                              <TestQuestionOption
                                key={index}
                                pointValue={index + 1}
                                nameField={`testQuestions[${sqIndex}].options[${index}]`}
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
                                  points: sq.options.length + 1,
                                })
                              }
                            >
                              Add option
                            </Button>
                          </>
                        )}
                      />
                    </Stack>
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
          {checkForMatchKeys(errors.testQuestions, touched.testQuestions) && (
            <ErrorMessage errors={errors.testQuestions} />
          )}
        </Stack>
      )}
    />
  );
};

export default TestQuestions;
