import { Page } from '@/types/pages';
import { TestResult } from '@/types/tests';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface TestResultCardProps {
  result: TestResult;
}
const TestResultCard = ({ result }: TestResultCardProps) => {
  return (
    <Card
      width={{ base: '100%', md: '65%' }}
      overflowY="scroll"
      padding={4}
      data-test-id="results-card"
    >
      <CardHeader>
        <Heading as="h1" size="lg">
          {result.header}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={8}>
          <Text>{result.body}</Text>
          <NextLink href={Page.Home} passHref>
            <Button as="span" colorScheme="blue">
              Return to Home Screen
            </Button>
          </NextLink>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TestResultCard;
