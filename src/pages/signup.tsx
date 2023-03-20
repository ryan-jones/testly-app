import { LoginFormValues } from '@/types/auth';
import { Text } from '@chakra-ui/react';

import { useAuth } from '@/hooks/useAuth';
import { Page } from '@/types/pages';
import NextLink from 'next/link';
import LoginForm from '@/components/LoginForm';

const SignupPage = () => {
  const { signUp } = useAuth();

  return (
    <LoginForm
      title="Login"
      submitButtonText="Login"
      submitAction={(data: LoginFormValues) =>
        signUp(data.email, data.password)
      }
    >
      <Text>
        Already a member?{' '}
        <NextLink href={Page.Login}>
          <Text as="span" textDecoration="underline">
            Login
          </Text>
        </NextLink>
      </Text>
    </LoginForm>
  );
};

export default SignupPage;
