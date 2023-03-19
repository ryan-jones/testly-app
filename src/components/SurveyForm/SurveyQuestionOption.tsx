import { DeleteIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { InputControl, NumberInputControl } from 'formik-chakra-ui';
import UneditableField from './UneditableField';

interface SurveyQuestionOptionProps {
  nameField: string;
  pointValue: number;
  onClickDelete: () => void;
}
const SurveyQuestionOption = ({
  nameField,
  onClickDelete,
  pointValue,
}: SurveyQuestionOptionProps) => {
  return (
    <HStack alignItems="flex-end">
      <InputControl name={`${nameField}.answer`} label="Answer" />
      <Box width="25%">
        <UneditableField
          name={`${nameField}.points`}
          label="Points"
          value={pointValue}
        />
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
