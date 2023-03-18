import { Survey } from '@/types/surveys';
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import SurveyLinkCard from './SurveyLinkCard';
import NextLink from 'next/link';
import { Page } from '@/types/pages';
import { EditIcon } from '@chakra-ui/icons';

interface CreatedSurveysCardProps {
  surveys: Survey[];
}
const CreatedSurveysCard = ({ surveys }: CreatedSurveysCardProps) => {
  return (
    <Card padding={4}>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Heading size="md">My Created Surveys</Heading>
          <NextLink href={Page.MySurveys}>
            <IconButton
              as="span"
              icon={<EditIcon />}
              aria-label="edit survey"
            />
          </NextLink>
        </Flex>
      </CardHeader>
      <CardBody>
        <HStack spacing={4} overflowX="scroll">
          {surveys.map((survey) => (
            <SurveyLinkCard key={survey.id} survey={survey} />
          ))}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CreatedSurveysCard;
