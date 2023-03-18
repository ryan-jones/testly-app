import { Page } from '@/types/pages';
import { Survey } from '@/types/surveys';
import { Heading, LinkOverlay } from '@chakra-ui/react';
import SurveyCard from './SurveyCard';

interface SurveyLinkCardProps {
  survey: Survey;
}
const SurveyLinkCard = ({ survey }: SurveyLinkCardProps) => {
  return (
    <SurveyCard>
      <LinkOverlay href={`${Page.Survey}/${survey.id}`}>
        <Heading color="white" textAlign="center">
          {survey.surveyName}
        </Heading>
      </LinkOverlay>
    </SurveyCard>
  );
};

export default SurveyLinkCard;
