import { SurveyFormValues } from '@/pages/dashboard/surveys';
import { SurveyQuestion, SurveyResult } from '@/types/surveys';
import { checkForMatchKeys, isArray, isObject } from '@/utils/validators';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { AccordionButton, AccordionIcon, Box, HStack } from '@chakra-ui/react';
import {
  FormikContextType,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from 'formik';

const checkForError = (
  index: number,
  errors?:
    | string
    | string[]
    | FormikErrors<SurveyQuestion>[]
    | FormikErrors<SurveyResult>[],
  touched?:
    | boolean
    | FormikTouched<SurveyQuestion>[]
    | FormikTouched<SurveyResult>[]
) => {
  if (
    !errors ||
    !touched ||
    !isArray(errors) ||
    !isArray(touched) ||
    !isObject(errors[index])
  ) {
    return false;
  }

  const selectErrorField = errors[index] as Record<string, any>;
  const selectTouchedField = (touched as FormikTouched<any>[])[index] as Record<
    string,
    any
  >;

  return checkForMatchKeys(selectErrorField, selectTouchedField);
};

interface SurveyAccordionButtonProps {
  index: number;
  field: keyof SurveyFormValues;
  header: string;
}
const SurveyAccordionButton = ({
  index,
  header,
  field,
}: SurveyAccordionButtonProps) => {
  const { errors, touched }: FormikContextType<SurveyFormValues> =
    useFormikContext();
  const fieldErrors = errors[field];
  const fieldTouched = touched[field];
  const hasError = checkForError(index, fieldErrors, fieldTouched);

  return (
    <AccordionButton>
      <Box
        as="span"
        flex="1"
        textAlign="left"
        color={hasError ? 'red' : 'black'}
      >
        {index + 1}: {header}
      </Box>
      <HStack spacing={8}>
        {hasError && <WarningTwoIcon color="red" />}

        <AccordionIcon color={hasError ? 'red' : 'black'} />
      </HStack>
    </AccordionButton>
  );
};

export default SurveyAccordionButton;
