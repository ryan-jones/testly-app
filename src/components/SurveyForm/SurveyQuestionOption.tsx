import { DeleteIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { InputControl } from 'formik-chakra-ui';

interface SurveyQuestionOptionProps {
  nameField: string;
  onClickDelete: () => void;
}
const SurveyQuestionOption = ({
  nameField,
  onClickDelete,
}: SurveyQuestionOptionProps) => {
  return (
    <HStack alignItems="flex-end">
      <InputControl name={`${nameField}.answer`} label="Answer" />
      <Box width="25%">
        <InputControl name={`${nameField}.weighting`} label="Weighting" />
      </Box>
      <IconButton
        aria-label="Delete question option"
        onClick={onClickDelete}
        icon={<DeleteIcon />}
      />
    </HStack>
  );
};

export default SurveyQuestionOption;
