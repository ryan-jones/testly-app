import { Test } from '@/types/tests';

describe('Tests Page', () => {
  let tests: Test[];
  beforeEach(() => {
    cy.visit('/tests');
    cy.callFirestore('get', 'tests').then((res) => {
      tests = res;
    });
  });
  it('Retrieves test collection from Firestore', () => {
    tests.forEach((test) => {
      cy.contains(test.testName).should('exist');
    });
  });
  it('Navigates the user to the selected test when clicked', () => {
    cy.contains(tests[0].testName).click();
    cy.url().should('include', `/test/${tests[0].id}`);
  });
});
