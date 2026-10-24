import { inventory } from '../pages/InventoryPage';

describe('Inventory UI — functional workflows', () => {
  beforeEach(() => inventory.visit());

  it('filters by item name', () => {
    inventory.search('rice');
    inventory.items().should('have.length', 1).first().should('contain.text', 'Rice');
  });

  it('shows empty state when search finds nothing', () => {
    inventory.search('not-found');
    cy.get('[data-testid="empty"]').should('be.visible').and('contain.text', 'No items found');
  });

  it('creates an item and shows success feedback', () => {
    inventory.add('Apples', 5);
    inventory.items().should('have.length', 3);
    cy.contains('[data-testid="item"]', 'Apples — 5').should('be.visible');
    inventory.message().should('contain.text', 'Item added');
  });

  it('deletes an existing item', () => {
    inventory.delete('Rice');
    cy.contains('[data-testid="item"]', 'Rice').should('not.exist');
    inventory.items().should('have.length', 1);
    inventory.message().should('contain.text', 'Item deleted');
  });

  it('rejects an empty item name', () => {
    cy.get('[data-testid="quantity"]').type('2');
    cy.get('[data-testid="add"]').click();
    inventory.message().should('contain.text', 'Enter a valid item');
    inventory.items().should('have.length', 2);
  });

  it('rejects a negative quantity', () => {
    cy.get('[data-testid="name"]').type('Bad item');
    cy.get('[data-testid="quantity"]').type('-1');
    cy.get('[data-testid="add"]').click();
    inventory.message().should('contain.text', 'Enter a valid item');
    inventory.items().should('have.length', 2);
  });
});
