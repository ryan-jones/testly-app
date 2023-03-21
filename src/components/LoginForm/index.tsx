import BaseLayout from '@/components/Layouts/BaseLayout';
import { LoginFormValues } from '@/types/auth';
import { Button, Card, Stack } from '@chakra-ui/react';
import { Formik, FormikProps } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { ReactNode, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Page } from '@/types/pages';
import ErrorMessage from '../Errors/ErrorMessage';
import { FirebaseExceptionCode } from '@/types/firebase';

const loginSchema = Yup.object({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

interface LoginFormProps {
  title: string;
  submitAction: (data: LoginFormValues) => void;
  submitButtonText: string;
  children: ReactNode;
}
const LoginForm = ({
  title,
  submitAction,
  submitButtonText,
  children,
}: LoginFormProps) => {
  const router = useRouter();
  const formRef = useRef<FormikProps<LoginFormValues>>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await submitAction(data);
      router.push(Page.Home);
    } catch (error: any) {
      if (
        [
          FirebaseExceptionCode.InvalidEmail,
          FirebaseExceptionCode.WrongPassword,
        ].includes(error?.code)
      ) {
        setSubmissionError('Email and password values are invalid');
      }

      setSubmissionError('An error occurred!');
    }
  };

  return (
    <BaseLayout title={title}>
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
                  {submitButtonText}
                </Button>
                {submissionError && <ErrorMessage errors={submissionError} />}
                {children}
              </Stack>
            </Card>
          )}
        </Formik>
      </Stack>
    </BaseLayout>
  );
};

export default LoginForm;
