import { Survey } from '@/types/surveys';

describe('Surveys Page', () => {
  let surveys: Survey[];
  beforeEach(() => {
    cy.visit('/surveys');
    cy.callFirestore('get', 'surveys').then((res) => {
      surveys = res;
    });
  });
  it('Retrieves survey collection from Firestore', () => {
    surveys.forEach((survey) => {
      cy.contains(survey.surveyName).should('exist');
    });
  });
  it('Navigates the user to the selected survey when clicked', () => {
    cy.contains(surveys[0].surveyName).click();
    cy.url().should('include', `/survey/${surveys[0].id}`);
  });
});
