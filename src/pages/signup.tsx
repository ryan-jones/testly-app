import ErrorMessage from '@/components/Errors/ErrorMessage';
import BaseLayout from '@/components/Layouts/BaseLayout';
import { useAuth } from '@/hooks/useAuth';
import { SignupFormValues } from '@/types/auth';
import { FirebaseExceptionCode } from '@/types/firebase';
import { Page } from '@/types/pages';
import { Button, Card, Stack, Text } from '@chakra-ui/react';
import { Formik, FormikProps } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import NextLink from 'next/link';
import useToaster from '@/hooks/useToaster';

const loginSchema = Yup.object({
  email: Yup.string().required('Email is required'),
  username: Yup.string().required(),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'a password should be at least 6 characters'),
});

const initialValues: SignupFormValues = {
  email: '',
  password: '',
  username: '',
};

const SignupForm = () => {
  const { signUp } = useAuth();
  const { errorToast, successToast } = useToaster();

  const router = useRouter();
  const formRef = useRef<FormikProps<SignupFormValues>>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const { email, password, username } = data;
      await signUp(email, password, username);
      router.push(Page.Dashboard);
      successToast("Congratulations! You've joined Testly.");
    } catch (error: any) {
      console.log(error.code);
      if (
        [
          FirebaseExceptionCode.InvalidEmail,
          FirebaseExceptionCode.WrongPassword,
        ].includes(error?.code)
      ) {
        setSubmissionError('Email and password values are invalid');
      } else if (error?.code === FirebaseExceptionCode.AlreadyInUse) {
        setSubmissionError('An account with this email already exists!');
      } else {
        errorToast(
          'An error occurred while creating your user! Please try again in a few moments'
        );
        setSubmissionError('An error occurred!');
      }
    }
  };

  return (
    <BaseLayout title="Signup">
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
                <InputControl name="username" label="Username" />
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
                  Signup
                </Button>
                {submissionError && <ErrorMessage errors={submissionError} />}
                <Text>
                  Already a member?{' '}
                  <NextLink href={Page.Login}>
                    <Text as="span" textDecoration="underline">
                      Login
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

export default SignupForm;
