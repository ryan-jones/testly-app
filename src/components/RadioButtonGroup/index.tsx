import { Stack, useRadioGroup, UseRadioGroupProps } from '@chakra-ui/react';
import RadioButton from './RadioButton';

interface RadioOption {
  value: string;
  label: string;
}

interface Props extends UseRadioGroupProps {
  options: RadioOption[];
}

export const RadioButtonGroup = (props: Props) => {
  const { options, ...rest } = props;
  const { getRootProps, getRadioProps } = useRadioGroup(rest);

  const group = getRootProps();

  return (
    <Stack {...group}>
      {options.map(({ value, label }) => {
        const radio = getRadioProps({ value });
        return (
          <RadioButton key={value} {...radio}>
            {label}
          </RadioButton>
        );
      })}
    </Stack>
  );
};

export default RadioButtonGroup;
