import TestLinkCard from '@/components/Cards/TestLinkCard';
import BaseLayout from '@/components/Layouts/BaseLayout';
import { Test } from '@/types/tests';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getAllTests } from '../../firebaseClient';

const TestsPage = ({
  tests,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BaseLayout title="Tests">
      <Stack
        spacing={8}
        padding={8}
        minHeight="100vh"
        bgGradient="radial(blackAlpha.50, blackAlpha.200)"
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {tests.map((test: Test) => (
            <TestLinkCard key={test.id} test={test} />
          ))}
        </SimpleGrid>
      </Stack>
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  tests: Test[];
}> = async () => {
  const tests: Test[] = await getAllTests();

  return {
    props: {
      tests,
    },
  };
};

export default TestsPage;
