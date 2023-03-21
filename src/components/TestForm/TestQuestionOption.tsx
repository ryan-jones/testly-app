import { DeleteIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { InputControl } from 'formik-chakra-ui';
import UneditableField from './UneditableField';

interface TestQuestionOptionProps {
  nameField: string;
  pointValue: number;
  onClickDelete: () => void;
}
const TestQuestionOption = ({
  nameField,
  onClickDelete,
  pointValue,
}: TestQuestionOptionProps) => {
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

export default TestQuestionOption;
