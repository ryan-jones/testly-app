import { SurveyFormValues } from '@/pages/dashboard/surveys';
import { SurveyOption, SurveyQuestion } from '@/types/surveys';
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
import SurveyAccordionButton from './SurveyAccordionButton';
import SurveyQuestionOption from './SurveyQuestionOption';

interface SurveyQuestionsProps {
  surveyQuestions: SurveyQuestion[];
}
const SurveyQuestions = ({ surveyQuestions }: SurveyQuestionsProps) => {
  const { errors, touched }: FormikContextType<SurveyFormValues> =
    useFormikContext();

  return (
    <FieldArray
      name="surveyQuestions"
      render={(arrayHelpers: FieldArrayRenderProps) => (
        <Stack spacing={8}>
          <Accordion allowToggle>
            {surveyQuestions?.map((sq: SurveyQuestion, sqIndex: number) => (
              <AccordionItem key={sqIndex}>
                <SurveyAccordionButton
                  index={sqIndex}
                  header={sq.question}
                  field="surveyQuestions"
                />

                <AccordionPanel>
                  <Stack spacing={4} divider={<StackDivider />}>
                    <PrimaryField
                      label="Survey Question"
                      name={`surveyQuestions[${sqIndex}].question`}
                      ariaLabel="Delete question"
                      onClick={() => arrayHelpers.remove(sqIndex)}
                    />
                    <Stack spacing={4}>
                      <FormLabel>Answers (minimum of 2)</FormLabel>
                      <FieldArray
                        name={`surveyQuestions[${sqIndex}].options`}
                        render={(sqArrayHelpers: FieldArrayRenderProps) => (
                          <>
                            {sq.options.map(
                              (_: SurveyOption, index: number) => (
                                <SurveyQuestionOption
                                  key={index}
                                  pointValue={index + 1}
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
          {checkForMatchKeys(
            errors.surveyQuestions,
            touched.surveyQuestions
          ) && <ErrorMessage errors={errors.surveyQuestions} />}
        </Stack>
      )}
    />
  );
};

export default SurveyQuestions;
