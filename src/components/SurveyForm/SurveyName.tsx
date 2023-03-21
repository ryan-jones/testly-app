import { Survey, SurveyFormValues } from '@/types/surveys';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { FormikContextType, useFormikContext } from 'formik';
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { ChangeEvent, useState } from 'react';

interface SurveyNameProps {
  surveys: Survey[];
}
const SurveyName = ({ surveys }: SurveyNameProps) => {
  const { setFieldValue, values }: FormikContextType<SurveyFormValues> =
    useFormikContext();

  const [isNewSurvey, setIsNewSurvey] = useState(true);

  const onToggleNewSurvey = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNewSurvey(e.target.checked);

    if (e.target.checked) {
      setFieldValue('id', '');
      setFieldValue('surveyName', '');
      setFieldValue('surveyQuestions', []);
      setFieldValue('surveyResults', []);
    } else {
      setFieldValue('id', surveys[0].id);
      setFieldValue('surveyName', surveys[0].surveyName);
      setFieldValue('surveyQuestions', surveys[0].surveyQuestions);
      setFieldValue('surveyResults', surveys[0].surveyResults);
    }
  };

  const onSelectSurveyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSurvey = surveys.find(
      (survey) => survey.id === e.target.value
    );
    if (selectedSurvey) {
      setFieldValue('id', selectedSurvey.id);
      setFieldValue('surveyName', selectedSurvey.surveyName);
      setFieldValue('surveyQuestions', selectedSurvey.surveyQuestions);
      setFieldValue('surveyResults', selectedSurvey.surveyResults);
    }
  };
  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="collection" mb="0">
          Create new collection?
        </FormLabel>
        <Switch
          id="collection"
          isChecked={isNewSurvey}
          onChange={onToggleNewSurvey}
        />
      </FormControl>

      {isNewSurvey ? (
        <InputControl label="Survey Name *" name="surveyName" />
      ) : (
        <SelectControl
          name="surveyName"
          label="Select Survey"
          selectProps={{
            value: values.id,
            onChange: (e) => onSelectSurveyChange(e),
          }}
        >
          {surveys.map((survey: Survey) => (
            <option key={survey.id} value={survey.id}>
              {survey.surveyName}
            </option>
          ))}
        </SelectControl>
      )}
    </>
  );
};

export default SurveyName;
