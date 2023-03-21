import { Survey, SurveyResult } from '@/types/surveys';

describe('Survey Page', () => {
  let survey: Survey;
  beforeEach(() => {
    cy.callFirestore('get', 'surveys').then((res) => {
      survey = res[0];
      cy.visit(`/survey/${survey.id}`);
    });
  });
  it('Loads the correct survey', () => {
    const firstQuestion = survey.surveyQuestions[0];
    cy.contains(firstQuestion.question).should('exist');
    firstQuestion.options.forEach((option) => {
      cy.contains(option.answer).should('exist');
    });
    cy.get(`[data-test-id="${firstQuestion.question}-card"]`).within(() => {
      cy.get('button').should('be.disabled');
    });
  });
  it('Allows the user to complete the survey', () => {
    const { surveyQuestions } = survey;

    let totalPoints = 0;

    surveyQuestions.forEach((pQuestion, index: number) => {
      cy.get(`[data-test-id="${pQuestion.question}-card"]`).within(() => {
        const buttonText =
          index === surveyQuestions.length - 1
            ? 'Submit your answers'
            : 'Next question';
        cy.contains(pQuestion.question).should('exist');
        cy.contains(buttonText).should('be.disabled');
        const selectedOptionIndex = Math.floor(
          Math.random() * pQuestion.options.length
        );

        const selectedOption = pQuestion.options[selectedOptionIndex];
        cy.contains(selectedOption.answer).click();
        totalPoints += selectedOption.points;

        cy.contains(buttonText).should('be.enabled').click();
      });
    });

    cy.get('[data-test-id="results-card"]').within(() => {
      const surveyResultIndex = survey.surveyResults.findIndex(
        (surveyResult: SurveyResult, index: number) => {
          if (!index) {
            return totalPoints > 0 && totalPoints <= surveyResult.score;
          }

          return (
            totalPoints > survey.surveyResults[index - 1].score &&
            totalPoints <= surveyResult.score
          );
        }
      );
      const selectedResult = survey.surveyResults[surveyResultIndex];

      cy.contains(selectedResult.header).should('exist');
      cy.contains('Return to Home Screen').click();
    });
    cy.contains('Welcome to Survely!').should('exist');
  });
});
