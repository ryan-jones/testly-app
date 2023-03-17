import { SurveyResult } from '@/types/surveys';
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

interface SurveyResultCardProps {
  result: SurveyResult;
}
const SurveyResultCard = ({ result }: SurveyResultCardProps) => {
  return (
    <Card width={{ base: '100%', md: '65%' }} overflowY="scroll" padding={4}>
      <CardHeader>
        <Heading as="h1" size="lg">
          {result.header}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={8}>
          <Text>{result.body}</Text>
          <NextLink href="/" passHref>
            <Button as="span" colorScheme="blue">
              Return to Home Screen
            </Button>
          </NextLink>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default SurveyResultCard;
