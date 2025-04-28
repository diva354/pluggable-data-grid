import columns from '../../src/config/columns.json'; // adjust your path!

describe('Renderer Mapping Validation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4173');
  });

  columns.forEach(({ key, rendererType }, index) => {
    
        it(`should have correct renderer for "${key}" with type "${rendererType}"`, () => {
            cy.get('td').eq(index)
              .should('have.attr', 'data-renderer', rendererType);
          });
    
  });
});
