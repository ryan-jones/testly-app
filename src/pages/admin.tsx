import BaseLayout from '@/components/BaseLayout';
import { Button, Card, Stack } from '@chakra-ui/react';
import { db } from '../../firebase';
import { setDoc, doc, collection, addDoc } from '@firebase/firestore';
import { useRef } from 'react';
import { SurveyQuestion } from '@/types/surveys';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import SurveyName from '@/components/SurveyForm/SurveyName';
import SurveyQuestions from '@/components/SurveyForm/SurveyQuestions';
import useGetSurveys from '@/hooks/useGetSurveys';

export interface SurveyFormValues {
  id: string;
  surveyName: string;
  surveyQuestions: SurveyQuestion[];
}

const initialValues: SurveyFormValues = {
  id: '',
  surveyName: '',
  surveyQuestions: [],
};

const surveyFormSchema = Yup.object({
  surveyName: Yup.string().required('Survey Name is required'),
  surveyQuestions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required('Question is required'),
      options: Yup.array().of(
        Yup.object().shape({
          answer: Yup.string().required(),
          weighting: Yup.number().required(),
        })
      ),
    })
  ),
});

const AdminPage = () => {
  const { surveys, loading, error } = useGetSurveys();
  const formRef = useRef<FormikProps<SurveyFormValues>>(null);

  const uploadSurvey = async (formData: SurveyFormValues) => {
    try {
      if (formData.id) {
        const selectedSurveyRef = doc(db, 'surveys', formData.id);
        await setDoc(selectedSurveyRef, formData as Record<string, any>);
      } else {
        const collectionRef = collection(db, 'surveys');
        const { id, ...rest } = formData;
        await addDoc(collectionRef, rest);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <BaseLayout title="Admin">
      <Stack
        spacing={12}
        height="100vh"
        justifyContent="center"
        alignItems="center"
        background="blackAlpha.50"
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={surveyFormSchema}
          onSubmit={uploadSurvey}
        >
          {({ isSubmitting, submitForm, values }) => (
            <Stack spacing={8} width="50%">
              <Card padding={4}>
                <Stack spacing={4}>
                  <SurveyName surveys={surveys} />
                  <SurveyQuestions surveyQuestions={values.surveyQuestions} />
                </Stack>
              </Card>
              <Button
                type="submit"
                onClick={submitForm}
                isLoading={isSubmitting}
                colorScheme="green"
              >
                Upload Survey
              </Button>
            </Stack>
          )}
        </Formik>
      </Stack>
    </BaseLayout>
  );
};

export default AdminPage;
