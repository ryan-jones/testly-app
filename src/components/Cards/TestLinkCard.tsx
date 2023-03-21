import { Page } from '@/types/pages';
import { Test } from '@/types/tests';
import { CardProps, Heading, LinkOverlay } from '@chakra-ui/react';
import TestCard from './TestCard';

interface TestLinkCardProps extends CardProps {
  test: Test;
}
const TestLinkCard = ({ test, ...rest }: TestLinkCardProps) => {
  return (
    <TestCard minWidth="300px" {...rest}>
      <LinkOverlay href={`${Page.Test}/${test.id}`}>
        <Heading color="white" textAlign="center">
          {test.testName}
        </Heading>
      </LinkOverlay>
    </TestCard>
  );
};

export default TestLinkCard;
