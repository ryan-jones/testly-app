import { Test, TestFormValues } from '@/types/tests';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { FormikContextType, useFormikContext } from 'formik';
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { ChangeEvent, useState } from 'react';

interface TestNameProps {
  tests: Test[];
}
const TestName = ({ tests }: TestNameProps) => {
  const { setFieldValue, values }: FormikContextType<TestFormValues> =
    useFormikContext();

  const [isNewTest, setIsNewTest] = useState(true);

  const onToggleNewTest = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNewTest(e.target.checked);

    if (e.target.checked) {
      setFieldValue('id', '');
      setFieldValue('testName', '');
      setFieldValue('testQuestions', []);
      setFieldValue('testResults', []);
    } else {
      setFieldValue('id', tests[0].id);
      setFieldValue('testName', tests[0].testName);
      setFieldValue('testQuestions', tests[0].testQuestions);
      setFieldValue('testResults', tests[0].testResults);
    }
  };

  const onSelectTestChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTest = tests.find((test) => test.id === e.target.value);
    if (selectedTest) {
      setFieldValue('id', selectedTest.id);
      setFieldValue('testName', selectedTest.testName);
      setFieldValue('testQuestions', selectedTest.testQuestions);
      setFieldValue('testResults', selectedTest.testResults);
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
          isChecked={isNewTest}
          onChange={onToggleNewTest}
        />
      </FormControl>

      {isNewTest ? (
        <InputControl label="Test Name *" name="testName" />
      ) : (
        <SelectControl
          name="testName"
          label="Select Test"
          selectProps={{
            value: values.id,
            onChange: (e) => onSelectTestChange(e),
          }}
        >
          {tests.map((test: Test) => (
            <option key={test.id} value={test.id}>
              {test.testName}
            </option>
          ))}
        </SelectControl>
      )}
    </>
  );
};

export default TestName;
