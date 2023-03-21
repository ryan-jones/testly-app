import { Test } from '@/types/tests';
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import TestLinkCard from './TestLinkCard';
import NextLink from 'next/link';
import { Page } from '@/types/pages';
import { EditIcon } from '@chakra-ui/icons';

interface CreatedTestsCardProps {
  tests: Test[];
}
const CreatedTestsCard = ({ tests }: CreatedTestsCardProps) => {
  return (
    <Card padding={4}>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Heading size="md">My Created Tests</Heading>
          <NextLink href={Page.MyTests}>
            <IconButton as="span" icon={<EditIcon />} aria-label="edit test" />
          </NextLink>
        </Flex>
      </CardHeader>
      <CardBody>
        <HStack spacing={4} overflowX="scroll">
          {tests.map((test) => (
            <TestLinkCard key={test.id} test={test} />
          ))}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CreatedTestsCard;
