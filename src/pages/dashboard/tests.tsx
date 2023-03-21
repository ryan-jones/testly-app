import BaseLayout from '@/components/Layouts/BaseLayout';
import {
  Button,
  Card,
  Stack,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Test, TestFormValues } from '@/types/tests';
import { Formik, FormikProps } from 'formik';
import nookies from 'nookies';

import TestName from '@/components/TestForm/TestName';
import TestQuestions from '@/components/TestForm/TestQuestions';
import TestResults from '@/components/TestForm/TestResults';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import {
  createTest,
  getAllTestsById,
  getUserProfileById,
  updateTest,
} from '../../../firebaseClient';
import firebaseAdmin from '../../../firebaseAdmin';
import { Page } from '@/types/pages';
import TestTab from '@/components/TestForm/TestTab';
import ErrorMessage from '@/components/Errors/ErrorMessage';
import { UserProfile } from '@/types/user';
import { testFormSchema } from '@/schemas/testFormSchema';
import { useRouter } from 'next/router';
import { isString } from '@/utils/validators';

const initialValues: Omit<TestFormValues, 'createdBy'> = {
  id: '',
  testName: '',
  testQuestions: [],
  testResults: [],
};

const UserTestsPage = ({
  tests,
  userProfile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const formRef = useRef<FormikProps<TestFormValues>>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const router = useRouter();

  const uploadTest = async (formData: TestFormValues) => {
    try {
      if (formData.id) {
        await updateTest(formData);
      } else {
        await createTest(formData);
      }
      router.push(Page.Dashboard);
    } catch (error) {
      setSubmissionError('An error occurred while submitting your test!');
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
          validationSchema={testFormSchema}
          onSubmit={uploadTest}
        >
          {({ isSubmitting, submitForm, values, errors, touched }) => (
            <Stack spacing={8} width="50%">
              <Card padding={4} overflowY="scroll">
                <Stack spacing={4}>
                  <TestName tests={tests} />
                  <Tabs>
                    <TabList>
                      <TestTab
                        tooltipLabel="Please enter a test name before moving on to this section"
                        tabName={`Test Questions (${values.testQuestions.length}) *`}
                        isDisabled={
                          Boolean(errors.testName) ||
                          !values.testName ||
                          Boolean(errors.testResults)
                        }
                        errorFieldName="testQuestions"
                      />
                      <TestTab
                        tooltipLabel="Please fill out your test questions before moving on to this section"
                        tabName={`Test Results (${values.testResults.length}) *`}
                        isDisabled={
                          Boolean(errors.testQuestions) ||
                          !values.testQuestions.length
                        }
                        errorFieldName="testResults"
                      />
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <TestQuestions testQuestions={values.testQuestions} />
                      </TabPanel>
                      <TabPanel>
                        <TestResults testResults={values.testResults} />
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
                  !values.testQuestions.length || values.testResults.length < 2
                }
                colorScheme="green"
              >
                {values.id ? 'Update Test' : 'Upload Test'}
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
  tests: Test[];
  userProfile: UserProfile;
}> = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin
      .auth()
      .verifyIdToken(cookies.firebaseToken);

    const tests: Test[] = await getAllTestsById(token.uid);
    const userProfile = await getUserProfileById(token.uid);

    return {
      props: {
        tests,
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
export default UserTestsPage;
