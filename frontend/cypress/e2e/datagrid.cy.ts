describe('Dynamic Data Grid', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4173'); // Change if your frontend is on another port
    });
  
    it('should render the grid with correct headings', () => {
      cy.contains('Dynamic Data Grid');
      cy.get('th').should('have.length.greaterThan', 0); // Check headers exist
    });
    
    it('should allow clicking into an editable cell and editing the value', () => {
      // Find first editable cell (assuming your grid has one editable column)
      cy.get('td').last().click();
      
      // Should now be an input field visible
      cy.get('input')
        .type('Updated_Task')
        .blur(); // simulate clicking outside
  
      // Confirm value updated
      cy.get('td').last().should('contain', 'Updated_Task');
    });
    
    it('should not allow id cell to edit', () => {
        cy.get('td').first().click();

        //Should not show any editor
        cy.get('input').should('not.exist');

        cy.get('td').first().should('be.visible');
    });

    it('should allow task cell to edit', () => {
        cy.get('td').eq(1).click();

        //Should now show default editor
        cy.get('input')
        .clear()
          .type('Testing done')
          .blur()

          cy.get('td').eq(1).should('contain', 'Testing done');
    });

    it('should allow volume cell to edit', () => {
        cy.get('td').eq(3).click();

        //Should now show numeric editor
        cy.get('input')
        .clear()
          .type('8209')
          .blur()

          cy.get('td').eq(3).should('have.text', '8209');
    });

    it('should filter editable options based on search input', () => {
        cy.get('td').eq(2).click();
        //Should now show multi-select-editor
        cy.get('.data-cell-editable')
          .click()
          .get('.search-bar')
          .type('Chan');
      
        // Now validate all the options
        cy.get('.editable-options')
          .each(($option) => {
            cy.wrap($option)
              .invoke('text')
              .then((text) => {
                expect(text.toLowerCase()).to.include('chan');
              });
          });
      });

    it('should allow users cell to edit and select any options', () => {
        cy.get('td').eq(2).click();

        //Should now show default editor
        cy.get('.data-cell-editable')
        .click()
        .get('.search-bar')
          .type('Chan');


          cy.get('.editable-options')
          .first()
          .click();

          cy.get('td').eq(2).should('contain', 'Chandler');
    });

    it('should allow users cell to edit and unselect', () => {
        cy.get('td').eq(2).click();

        //Should now show default editor
        cy.get('.data-cell-editable')
        .click()
        .get('.search-bar')
          .type('Ros');


          cy.get('.editable-options')
          .first()
          .click();

          cy.get('body').click(0, 0);
          cy.get('td').eq(2).should('not.contain', 'Ross');
    });
    /*it('should scroll the table if there are many rows (virtualization)', () => {
      cy.scrollTo('bottom');
      cy.get('td').last().should('be.visible');
    });*/
  });  