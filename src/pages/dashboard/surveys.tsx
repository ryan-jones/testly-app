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
import nookies from 'nookies';

import SurveyName from '@/components/SurveyForm/SurveyName';
import SurveyQuestions from '@/components/SurveyForm/SurveyQuestions';
import SurveyResults from '@/components/SurveyForm/SurveyResults';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import {
  createSurvey,
  getAllSurveysById,
  updateSurvey,
} from '../../../firebaseClient';
import firebaseAdmin from '@/firebaseAdmin';
import { Page } from '@/types/pages';

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

const UserSurveysPage = ({
  surveys,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        padding={12}
        minHeight="100vh"
        width="100%"
        alignItems="center"
        bgGradient="radial(blackAlpha.50, blackAlpha.200)"
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={surveyFormSchema}
          onSubmit={uploadSurvey}
        >
          {({ isSubmitting, submitForm, values }) => (
            <Stack spacing={8} width="50%">
              <Card padding={4} overflowY="scroll">
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
                {values.id ? 'Update Survey' : 'Upload Survey'}
              </Button>
            </Stack>
          )}
        </Formik>
      </Stack>
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  surveys: Survey[];
}> = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin
      .auth()
      .verifyIdToken(cookies.firebaseToken);

    const surveys: Survey[] = await getAllSurveysById(token.uid);

    return {
      props: {
        surveys,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: Page.Login,
        permanent: false,
      },
    };
  }
};
export default UserSurveysPage;
