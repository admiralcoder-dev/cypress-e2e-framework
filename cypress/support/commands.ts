declare global {
  namespace Cypress {
    interface Chainable {
      resetInventory(): Chainable<void>;
    }
  }
}
Cypress.Commands.add('resetInventory', () => {
  cy.request('POST', '/__test/reset').its('status').should('eq', 200);
});
export {};
