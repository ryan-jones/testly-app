import { CompletedSurvey } from '@/types/user';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import SurveyCard from './SurveyCard';

interface CompletedSurveysCardProps {
  completedSurveys: CompletedSurvey[];
}
const CompletedSurveysCard = ({
  completedSurveys,
}: CompletedSurveysCardProps) => {
  return (
    <Card padding={4}>
      <CardHeader>
        <Heading size="md">My Survey Results</Heading>
      </CardHeader>
      <CardBody>
        <HStack spacing={4} overflowX="scroll">
          {completedSurveys.map((survey) => (
            <SurveyCard
              key={survey.surveyName}
              bgGradient="linear(to-bl, yellow.200, red.600)"
            >
              <Heading color="white" textAlign="center">
                {survey.surveyResult.header}
              </Heading>
              <Text color="white">({survey.surveyName})</Text>
            </SurveyCard>
          ))}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CompletedSurveysCard;
