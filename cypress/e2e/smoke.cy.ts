import { inventory } from '../pages/InventoryPage';

describe('Inventory demo — smoke @smoke', () => {
  it('loads the page and shows its title', () => {
    inventory.visit();
    cy.title().should('eq', 'AdmiralCoder Inventory Demo');
    cy.contains('h1', 'Inventory Demo').should('be.visible');
  });
  it('renders seeded inventory', () => {
    inventory.visit();
    inventory.items().should('have.length', 2);
    cy.contains('[data-testid="item"]', 'Rice — 2').should('be.visible');
    cy.contains('[data-testid="item"]', 'Milk — 1').should('be.visible');
  });
});
