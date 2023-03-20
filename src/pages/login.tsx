import { LoginFormValues } from '@/types/auth';
import { Text } from '@chakra-ui/react';

import { useAuth } from '@/hooks/useAuth';
import { Page } from '@/types/pages';
import NextLink from 'next/link';
import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
  const { logIn } = useAuth();

  return (
    <LoginForm
      title="Login"
      submitButtonText="Login"
      submitAction={(data: LoginFormValues) => logIn(data.email, data.password)}
    >
      <Text>
        Not yet a member?{' '}
        <NextLink href={Page.Signup}>
          <Text as="span" textDecoration="underline">
            Signup
          </Text>
        </NextLink>
      </Text>
    </LoginForm>
  );
};

export default LoginPage;
