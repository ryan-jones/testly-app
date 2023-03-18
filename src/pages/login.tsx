import { LoginFormValues } from '@/types/auth';
import { Text } from '@chakra-ui/react';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { Page } from '@/types/pages';
import NextLink from 'next/link';
import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
  const { logIn } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await logIn(data.email, data.password);
      router.push(Page.Home);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginForm title="Login" submitButtonText="Login" submitAction={onSubmit}>
      <Text>
        Not yet a member? <NextLink href={Page.Signup}>Signup</NextLink>
      </Text>
    </LoginForm>
  );
};

export default LoginPage;
