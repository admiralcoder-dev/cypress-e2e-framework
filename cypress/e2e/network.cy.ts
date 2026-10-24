import { inventory } from '../pages/InventoryPage';

describe('Inventory API — interception and resilience', () => {
  it('renders deterministic fixture data from intercepted GET', () => {
    cy.intercept('GET', '/api/items', { fixture: 'items.json' }).as('items');
    inventory.visit();
    cy.wait('@items').its('response.statusCode').should('eq', 200);
    inventory.items().should('have.length', 2);
    cy.contains('[data-testid="item"]', 'Coffee — 4').should('be.visible');
  });

  it('displays a recoverable error when GET fails', () => {
    cy.intercept('GET', '/api/items', { statusCode: 503, body: { error: 'Unavailable' } }).as('failedItems');
    inventory.visit();
    cy.wait('@failedItems');
    inventory.message().should('contain.text', 'Unable to load inventory');
    cy.get('[data-testid="empty"]').should('be.visible');
  });

  it('asserts the POST request body and response', () => {
    cy.intercept('POST', '/api/items').as('createItem');
    inventory.visit();
    inventory.add('Pasta', 3);
    cy.wait('@createItem').then(({ request, response }) => {
      expect(request.body).to.deep.equal({ name: 'Pasta', quantity: 3 });
      expect(response?.statusCode).to.eq(201);
      expect(response?.body.data).to.include({ name: 'Pasta', quantity: 3 });
    });
    cy.contains('[data-testid="item"]', 'Pasta — 3').should('be.visible');
  });

  it('shows an error when saving fails', () => {
    cy.intercept('POST', '/api/items', { statusCode: 500, body: { error: 'Internal error' } }).as('failedCreate');
    inventory.visit();
    inventory.add('Pasta', 3);
    cy.wait('@failedCreate');
    inventory.message().should('contain.text', 'Unable to save item');
    inventory.items().should('have.length', 2);
  });
});
