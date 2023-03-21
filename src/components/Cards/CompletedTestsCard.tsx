import { CompletedTest } from '@/types/user';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import TestCard from './TestCard';

interface CompletedTestsCardProps {
  completedTests: CompletedTest[];
}
const CompletedTestsCard = ({ completedTests }: CompletedTestsCardProps) => {
  return (
    <Card padding={4}>
      <CardHeader>
        <Heading size="md">My Test Results</Heading>
      </CardHeader>
      <CardBody>
        <HStack spacing={4} overflowX="scroll">
          {completedTests.map((test) => (
            <TestCard
              minWidth="300px"
              width="30%"
              key={test.testName}
              bgGradient="linear(to-bl, yellow.200, red.600)"
            >
              <Stack spacing={4} textAlign="center">
                <Heading color="white">{test.testResult.header}</Heading>
                <Text color="white">({test.testName})</Text>
              </Stack>
            </TestCard>
          ))}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CompletedTestsCard;
