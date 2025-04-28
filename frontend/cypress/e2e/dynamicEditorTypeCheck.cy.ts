import columns from '../../src/config/columns.json'; // adjust your path!

describe('Dynamic Column Type Editor Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4173'); 
      });
  
      columns.forEach(({ key, editorType }, index) => {
            it(`should show correct editor for field "${key}" of type`, () => {
                // 1. Click the td for this column
                cy.get('td').eq(index).click();
          
                // 2. Based on type, validate
                if (!editorType) {
                  cy.get('input').should('not.exist');
                } else if (editorType === 'default' || editorType === 'tag') {
                  cy.get('input[type="text"]').should('exist');
                } else if (editorType === 'numeric') {
                  cy.get('input[type="number"]').should('exist');
                } else if (editorType === 'multiselect') {
                  cy.get('.data-cell-editable').should('exist');
                  cy.get('.data-cell-editable').click();
                  cy.get('.search-bar').should('exist');
                  cy.get('.editable-options').should('exist');
                }
        })
        
            
      });
  });
  