import BaseLayout from '@/components/Layouts/BaseLayout';
import { Button, Heading, Stack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  return (
    <BaseLayout title="Personality Test">
      <Stack
        spacing={12}
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Stack spacing={8} alignItems="center">
          <Heading as="h1" size="xl">
            Welcome to the Personality Test!
          </Heading>
          <Heading size="lg">
            {"Curious about whether you're an introvert or an extrovert?"}
          </Heading>
        </Stack>
        <Link
          as={NextLink}
          href="/survey-select"
          style={{ textDecoration: 'none' }}
        >
          <Button as="span" colorScheme="blue">
            Get Started
          </Button>
        </Link>
      </Stack>
    </BaseLayout>
  );
}
