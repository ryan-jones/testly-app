import BaseLayout from '@/components/Layouts/BaseLayout';
import { Page } from '@/types/pages';
import { Test } from '@/types/tests';
import {
  Card,
  Heading,
  LinkOverlay,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getAllTests } from '../../firebaseClient';

import LinkButton from '@/components/LinkButton';

const TestSelectPage = ({
  tests,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <BaseLayout title="Test Select">
      <Stack
        spacing={8}
        height="80vh"
        alignItems="center"
        justifyContent="center"
        padding={{ base: 4, md: 12 }}
        backgroundColor="blue.600"
      >
        <Heading as="h1" size="4xl" color="white">
          Welcome to Testly!
        </Heading>
        <Heading color="white" size="lg">
          A free user-driven test platform
        </Heading>
      </Stack>
      <Stack
        spacing={4}
        padding={12}
        alignItems="center"
        backgroundColor="blackAlpha.50"
      >
        <Stack
          spacing={8}
          position="relative"
          zIndex={100}
          top={-60}
          alignItems="center"
          width={{ base: '100%', md: '70%' }}
        >
          <Heading as="h3" size="md" color="white">
            Get started by taking a test
          </Heading>
          <Card overflowY="scroll" padding={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {tests.map((test: Test) => (
                <Card
                  key={test.id}
                  height="30vh"
                  padding={4}
                  bgGradient="linear(to-bl, green.200, blue.600)"
                  justifyContent="center"
                  alignItems="center"
                >
                  <LinkOverlay key={test.id} href={`${Page.Test}/${test.id}`}>
                    <Heading color="white" textAlign="center">
                      {test.testName}
                    </Heading>
                  </LinkOverlay>
                </Card>
              ))}
            </SimpleGrid>
          </Card>
          <Heading as="h3" size="lg" color="green.500">
            Or create your own
          </Heading>
          <LinkButton variant="solid" colorScheme="green" href={Page.Signup}>
            Sign Up
          </LinkButton>
        </Stack>
        <Heading color="green.500" size="lg">
          Over 2 Users Worldwide since 2023
        </Heading>
      </Stack>
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps<{
  tests: Test[];
}> = async () => {
  const tests: Test[] = await getAllTests();
  return {
    props: {
      tests: tests.splice(0, 4),
    },
  };
};

export default TestSelectPage;
