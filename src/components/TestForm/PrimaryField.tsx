import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, IconButton } from '@chakra-ui/react';
import { InputControl } from 'formik-chakra-ui';

interface PrimaryFieldProps {
  name: string;
  label: string;
  ariaLabel: string;
  onClick: () => void;
}
const PrimaryField = ({
  name,
  label,
  ariaLabel,
  onClick,
}: PrimaryFieldProps) => {
  return (
    <HStack alignItems="flex-end">
      <InputControl label={label} name={name} />

      <IconButton
        aria-label={ariaLabel}
        alignSelf="flex-end"
        onClick={onClick}
        icon={<DeleteIcon />}
      />
    </HStack>
  );
};

export default PrimaryField;
