export class InventoryPage {
  visit(): void { cy.visit('/'); }
  items(): Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('[data-testid="item"]'); }
  search(value: string): void { cy.get('[data-testid="search"]').type(value); }
  add(name: string, quantity: number): void {
    cy.get('[data-testid="name"]').type(name);
    cy.get('[data-testid="quantity"]').type(String(quantity));
    cy.get('[data-testid="add"]').click();
  }
  delete(name: string): void { cy.contains('[data-testid="item"]', name).find('[data-testid="delete"]').click(); }
  message(): Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('[data-testid="message"]'); }
}
export const inventory = new InventoryPage();
