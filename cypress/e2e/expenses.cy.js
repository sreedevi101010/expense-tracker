describe('expense management', () => {
  it('adds, filters, counts, totals, and deletes expenses', () => {
    cy.visit('/')

    cy.get('[data-cy="title"]').type('Groceries')
    cy.get('[data-cy="amount"]').type('12.50')
    cy.get('[data-cy="category"]').select('Food')
    cy.get('[data-cy="add-expense"]').click()

    cy.get('[data-cy="title"]').type('Bus pass')
    cy.get('[data-cy="amount"]').type('7.30')
    cy.get('[data-cy="category"]').select('Travel')
    cy.get('[data-cy="add-expense"]').click()

    cy.get('[data-cy="total"]').should('have.text', '$19.80')
    cy.get('[data-cy="filter"]').select('Travel')
    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="expense-item"]').should('contain.text', 'Bus pass')
    cy.get('[data-cy="count"]').should('have.text', '1')
    cy.get('[data-cy="total"]').should('have.text', '$19.80')

    cy.get('[data-cy="filter"]').select('All')
    cy.contains('[data-cy="expense-item"]', 'Groceries')
      .find('[data-cy="delete-expense"]')
      .click()

    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="expense-item"]').should('contain.text', 'Bus pass')
    cy.get('[data-cy="count"]').should('have.text', '1')
    cy.get('[data-cy="total"]').should('have.text', '$7.30')
  })
})
