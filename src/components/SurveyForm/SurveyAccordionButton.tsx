import { SurveyFormValues } from '@/pages/dashboard/surveys';
import { isArray } from '@/utils/validators';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { AccordionButton, AccordionIcon, Box, HStack } from '@chakra-ui/react';
import { FormikContextType, FormikTouched, useFormikContext } from 'formik';

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

  const hasError =
    isArray(errors?.[field]) &&
    isArray(touched?.[field]) &&
    errors[field]?.[index] &&
    (touched[field] as FormikTouched<any[]>)?.[index];

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
