import BaseLayout from '@/components/Layouts/BaseLayout';
import {
  Box,
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
import { getAllSurveysById } from '../../../firebaseClient';
import firebaseAdmin from '@/firebaseAdmin';
import { Page } from '@/types/pages';
import InfoTooltip from '@/components/Notifications/InfoTooltip';

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
  surveyName: Yup.string().required('Survey Name is required.'),
  surveyQuestions: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required('A question is required.'),
        options: Yup.array().of(
          Yup.object().shape({
            answer: Yup.string().required(),
            points: Yup.number().required(),
          })
        ),
      })
    )
    .min(1, 'A survey must have at least one queston.'),
  surveyResults: Yup.array()
    .of(
      Yup.object().shape({
        header: Yup.string().required(),
        body: Yup.string().required(),
        score: Yup.string().required(),
      })
    )
    .required()
    .min(2, 'Each survey must have at least two results.'),
});

const UserSurveysPage = ({
  surveys,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const formRef = useRef<FormikProps<SurveyFormValues>>(null);

  const uploadSurvey = async (formData: SurveyFormValues) => {
    console.log('formData', formData);
    // try {
    //   if (formData.id) {
    //     updateSurvey(formData);
    //   } else {
    //     createSurvey(formData);
    //   }
    // } catch (error) {
    //   console.log('error', error);
    // }
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
          {({ isSubmitting, submitForm, values, errors, touched }) => (
            <Stack spacing={8} width="50%">
              <Card padding={4} overflowY="scroll">
                <Stack spacing={4}>
                  <SurveyName surveys={surveys} />
                  <Tabs>
                    <TabList>
                      <Tab
                        color={
                          errors.surveyQuestions &&
                          touched.surveyQuestions &&
                          'red'
                        }
                      >
                        Survey Questions ({values.surveyQuestions.length}) *
                      </Tab>
                      <InfoTooltip
                        label={
                          Boolean(errors.surveyQuestions) ||
                          !values.surveyQuestions.length
                            ? 'Please fill out your survey questions before moving on to this section'
                            : ''
                        }
                      >
                        <Tab
                          isDisabled={
                            Boolean(errors.surveyQuestions) ||
                            !values.surveyQuestions.length
                          }
                          color={
                            errors.surveyResults &&
                            touched.surveyResults &&
                            'red'
                          }
                        >
                          Survey Results ({values.surveyResults.length}) *
                        </Tab>
                      </InfoTooltip>
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
                isDisabled={
                  !values.surveyQuestions.length ||
                  values.surveyResults.length < 2
                }
                colorScheme="green"
              >
                {values.id ? 'Update Survey' : 'Upload Survey'}
              </Button>
              <Box>{JSON.stringify(errors)}</Box>
              <Box>{JSON.stringify(touched)}</Box>
              <Box>{JSON.stringify(values)}</Box>
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
