import { SurveyFormValues } from '@/pages/dashboard/surveys';
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

interface SurveyTabProps {
  isDisabled: boolean;
  tabName: string;
  tooltipLabel: string;
  errorFieldName: keyof SurveyFormValues;
}
const SurveyTab = ({
  isDisabled,
  tabName,
  errorFieldName,
  tooltipLabel,
}: SurveyTabProps) => {
  const { errors, touched }: FormikContextType<SurveyFormValues> =
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

export default SurveyTab;
