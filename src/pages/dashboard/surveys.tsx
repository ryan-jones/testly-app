import BaseLayout from '@/components/Layouts/BaseLayout';
import {
  Button,
  Card,
  Stack,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Survey, SurveyFormValues } from '@/types/surveys';
import { Formik, FormikProps } from 'formik';
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
  getUserProfileById,
  updateSurvey,
} from '../../../firebaseClient';
import firebaseAdmin from '@/firebaseAdmin';
import { Page } from '@/types/pages';
import SurveyTab from '@/components/SurveyForm/SurveyTab';
import ErrorMessage from '@/components/Errors/ErrorMessage';
import { UserProfile } from '@/types/user';
import { surveyFormSchema } from '@/schemas/surveyFormSchema';
import { useRouter } from 'next/router';

const initialValues: Omit<SurveyFormValues, 'createdBy'> = {
  id: '',
  surveyName: '',
  surveyQuestions: [],
  surveyResults: [],
};

const UserSurveysPage = ({
  surveys,
  userProfile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const formRef = useRef<FormikProps<SurveyFormValues>>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const router = useRouter();

  const uploadSurvey = async (formData: SurveyFormValues) => {
    try {
      if (formData.id) {
        await updateSurvey(formData);
      } else {
        await createSurvey(formData);
      }
      router.push(Page.Dashboard);
    } catch (error) {
      setSubmissionError('An error occurred while submitting your survey!');
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
          initialValues={{ ...initialValues, createdBy: userProfile.id }}
          validationSchema={surveyFormSchema}
          onSubmit={uploadSurvey}
        >
          {({ isSubmitting, submitForm, values, errors }) => (
            <Stack spacing={8} width="50%">
              <Card padding={4} overflowY="scroll">
                <Stack spacing={4}>
                  <SurveyName surveys={surveys} />
                  <Tabs>
                    <TabList>
                      <SurveyTab
                        tooltipLabel="Please enter a survey name before moving on to this section"
                        tabName={`Survey Questions (${values.surveyQuestions.length}) *`}
                        isDisabled={
                          Boolean(errors.surveyName) || !values.surveyName
                        }
                        errorFieldName="surveyQuestions"
                      />
                      <SurveyTab
                        tooltipLabel="Please fill out your survey questions before moving on to this section"
                        tabName={`Survey Results (${values.surveyResults.length}) *`}
                        isDisabled={
                          Boolean(errors.surveyQuestions) ||
                          !values.surveyQuestions.length
                        }
                        errorFieldName="surveyResults"
                      />
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
              {submissionError && <ErrorMessage errors={submissionError} />}
            </Stack>
          )}
        </Formik>
      </Stack>
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  surveys: Survey[];
  userProfile: UserProfile;
}> = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin
      .auth()
      .verifyIdToken(cookies.firebaseToken);

    const surveys: Survey[] = await getAllSurveysById(token.uid);
    const userProfile = await getUserProfileById(token.uid);

    return {
      props: {
        surveys,
        userProfile,
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
