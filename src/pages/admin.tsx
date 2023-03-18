import BaseLayout from '@/components/Layouts/BaseLayout';
import {
  Button,
  Card,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Survey, SurveyQuestion, SurveyResult } from '@/types/surveys';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import SurveyName from '@/components/SurveyForm/SurveyName';
import SurveyQuestions from '@/components/SurveyForm/SurveyQuestions';
import SurveyResults from '@/components/SurveyForm/SurveyResults';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSurvey, getAllSurveys, updateSurvey } from '../../firebase';

export interface SurveyFormValues {
  id: string;
  surveyName: string;
  surveyQuestions: SurveyQuestion[];
  surveyResults: SurveyResult[];
}

const initialValues: SurveyFormValues = {
  id: '',
  surveyName: '',
  surveyQuestions: [],
  surveyResults: [],
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
  surveyResults: Yup.array().of(
    Yup.object().shape({
      header: Yup.string().required(),
      body: Yup.string().required(),
    })
  ),
});

const AdminPage = ({
  surveys,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const formRef = useRef<FormikProps<SurveyFormValues>>(null);

  const uploadSurvey = async (formData: SurveyFormValues) => {
    try {
      if (formData.id) {
        updateSurvey(formData);
      } else {
        createSurvey(formData);
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
        bgGradient="linear(to-bl, blue.200, blue.400)"
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
                  <Tabs>
                    <TabList>
                      <Tab>Survey Questions</Tab>
                      <Tab>Survey Results</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <SurveyQuestions
                          surveyQuestions={values.surveyQuestions}
                        />
                      </TabPanel>
                      <TabPanel>
                        <SurveyResults surveyResults={values.surveyResults} />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
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

export const getStaticProps: GetStaticProps<{
  surveys: Survey[];
}> = async () => {
  const surveys: Survey[] = await getAllSurveys();

  return {
    props: {
      surveys,
    },
  };
};
export default AdminPage;
