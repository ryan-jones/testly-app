import BaseLayout from '@/components/Layouts/BaseLayout';
import { LoginFormValues } from '@/types/auth';
import { Button, Card, Stack, Text } from '@chakra-ui/react';
import { Formik, FormikProps } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Page } from '@/types/pages';
import { FirebaseExceptionCode } from '@/types/firebase';
import { useAuth } from '@/hooks/useAuth';
import NextLink from 'next/link';
import ErrorMessage from '@/components/Errors/ErrorMessage';
import useToaster from '@/hooks/useToaster';

const loginSchema = Yup.object({
  email: Yup.string().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'a password should be at least 6 characters'),
});

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const { logIn } = useAuth();
  const { successToast, errorToast } = useToaster();

  const router = useRouter();
  const formRef = useRef<FormikProps<LoginFormValues>>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await logIn(data.email, data.password);
      router.push(Page.Dashboard);
      successToast("You're logged in");
    } catch (error: any) {
      if (
        [
          FirebaseExceptionCode.InvalidEmail,
          FirebaseExceptionCode.WrongPassword,
          FirebaseExceptionCode.UserNotFound,
        ].includes(error?.code)
      ) {
        setSubmissionError('Email and password values are invalid');
      } else {
        errorToast(
          'An error occurred while logging you in! Please try again in a few moments'
        );

        setSubmissionError('An error occurred!');
      }
    }
  };

  return (
    <BaseLayout title="Login">
      <Stack
        spacing={12}
        padding={12}
        minHeight="100vh"
        width="100%"
        alignItems="center"
        bgGradient="linear(to-bl, blue.200, blue.400)"
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, submitForm }) => (
            <Card padding={8} width="60%">
              <Stack spacing={4}>
                <InputControl
                  name="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                />
                <InputControl
                  name="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                />
                <Button
                  type="submit"
                  onClick={submitForm}
                  isLoading={isSubmitting}
                  colorScheme="green"
                >
                  Login
                </Button>
                {submissionError && <ErrorMessage errors={submissionError} />}
                <Text>
                  Not yet a member?{' '}
                  <NextLink href={Page.Signup}>
                    <Text as="span" textDecoration="underline">
                      Signup
                    </Text>
                  </NextLink>
                </Text>
              </Stack>
            </Card>
          )}
        </Formik>
      </Stack>
    </BaseLayout>
  );
};

export default LoginPage;
