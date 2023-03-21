describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate between pages', () => {
    cy.get('a[href*="/surveys"').click();
    cy.url().should('include', '/surveys');
    cy.get('h1').contains('Choose a survey');

    cy.get('a[href*="/login"').click();
    cy.url().should('include', '/login');
    cy.contains('Email').should('exist');
    cy.contains('Password').should('exist');
  });

  it('should not show protected routes if the user is not authenticated', () => {
    cy.get('a[href*="/dashboard"').should('not.exist');
  });
});
