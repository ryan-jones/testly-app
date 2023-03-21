import { TestFormValues, TestQuestion, TestResult } from '@/types/tests';
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
    | FormikErrors<TestQuestion>[]
    | FormikErrors<TestResult>[],
  touched?:
    | boolean
    | FormikTouched<TestQuestion>[]
    | FormikTouched<TestResult>[]
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

interface TestAccordionButtonProps {
  index: number;
  field: keyof TestFormValues;
  header: string;
}
const TestAccordionButton = ({
  index,
  header,
  field,
}: TestAccordionButtonProps) => {
  const { errors, touched }: FormikContextType<TestFormValues> =
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

export default TestAccordionButton;
