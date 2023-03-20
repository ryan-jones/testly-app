import { Page } from '@/types/pages';
import { Survey } from '@/types/surveys';
import { CardProps, Heading, LinkOverlay } from '@chakra-ui/react';
import SurveyCard from './SurveyCard';

interface SurveyLinkCardProps extends CardProps {
  survey: Survey;
}
const SurveyLinkCard = ({ survey, ...rest }: SurveyLinkCardProps) => {
  return (
    <SurveyCard minWidth="300px" {...rest}>
      <LinkOverlay href={`${Page.Survey}/${survey.id}`}>
        <Heading color="white" textAlign="center">
          {survey.surveyName}
        </Heading>
      </LinkOverlay>
    </SurveyCard>
  );
};

export default SurveyLinkCard;
