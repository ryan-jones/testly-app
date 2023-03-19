import { NumberInputControl } from 'formik-chakra-ui';

interface UneditableFieldProps {
  name: string;
  label: string;
  value: number;
}
const UneditableField = ({ name, label, value }: UneditableFieldProps) => (
  <NumberInputControl
    name={name}
    label={label}
    showStepper={false}
    numberInputProps={{
      isDisabled: true,
      value,
    }}
  />
);

export default UneditableField;
