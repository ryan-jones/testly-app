import { Box, useRadio, UseRadioProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface RadioButtonProps extends UseRadioProps {
  children: ReactNode;
}
const RadioButton = ({ children, ...rest }: RadioButtonProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(rest);

  const inputProps = getInputProps();
  const checkboxProps = getCheckboxProps();

  return (
    <Box as="label">
      <input {...inputProps} />
      <Box
        {...checkboxProps}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'blue.600',
          color: 'white',
          borderColor: 'blue.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
};

export default RadioButton;
