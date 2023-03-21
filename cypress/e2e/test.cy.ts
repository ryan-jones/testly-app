import { Test, TestResult } from '@/types/tests';

describe('Test Page', () => {
  let test: Test;
  beforeEach(() => {
    cy.callFirestore('get', 'tests').then((res) => {
      test = res[0];
      cy.visit(`/test/${test.id}`);
    });
  });
  it('Loads the correct test', () => {
    const firstQuestion = test.testQuestions[0];
    cy.contains(firstQuestion.question).should('exist');
    firstQuestion.options.forEach((option) => {
      cy.contains(option.answer).should('exist');
    });
    cy.get(`[data-test-id="${firstQuestion.question}-card"]`).within(() => {
      cy.get('button').should('be.disabled');
    });
  });
  it('Allows the user to complete the test', () => {
    const { testQuestions } = test;

    let totalPoints = 0;

    testQuestions.forEach((pQuestion, index: number) => {
      cy.get(`[data-test-id="${pQuestion.question}-card"]`).within(() => {
        const buttonText =
          index === testQuestions.length - 1
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
      const testResultIndex = test.testResults.findIndex(
        (testResult: TestResult, index: number) => {
          if (!index) {
            return totalPoints > 0 && totalPoints <= testResult.score;
          }

          return (
            totalPoints > test.testResults[index - 1].score &&
            totalPoints <= testResult.score
          );
        }
      );
      const selectedResult = test.testResults[testResultIndex];

      cy.contains(selectedResult.header).should('exist');
      cy.contains('Return to Home Screen').click();
    });
    cy.contains('Welcome to Testly!').should('exist');
  });
});
