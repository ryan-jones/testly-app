import { TestFormValues } from '@/types/tests';
import { checkForMatchKeys } from '@/utils/validators';
import { Tab } from '@chakra-ui/react';
import {
  FormikContextType,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from 'formik';
import InfoTooltip from '../Notifications/InfoTooltip';

const hasError = (
  errors?: string | string[] | FormikErrors<any>[],
  touched?: boolean | FormikTouched<any>[]
) => {
  const isError = checkForMatchKeys(errors, touched);
  return isError;
};

interface TestTabProps {
  isDisabled: boolean;
  tabName: string;
  tooltipLabel: string;
  errorFieldName: keyof TestFormValues;
}
const TestTab = ({
  isDisabled,
  tabName,
  errorFieldName,
  tooltipLabel,
}: TestTabProps) => {
  const { errors, touched }: FormikContextType<TestFormValues> =
    useFormikContext();
  return (
    <InfoTooltip label={isDisabled ? tooltipLabel : ''}>
      <Tab
        isDisabled={isDisabled}
        color={
          hasError(errors[errorFieldName], touched[errorFieldName]) ? 'red' : ''
        }
      >
        {tabName}
      </Tab>
    </InfoTooltip>
  );
};

export default TestTab;
