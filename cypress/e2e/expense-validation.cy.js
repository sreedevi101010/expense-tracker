describe('expense validation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('rejects an empty title', () => {
    cy.get('[data-cy="amount"]').type('25')
    cy.get('[data-cy="category"]').select('Bills')
    cy.get('[data-cy="add-expense"]').click()

    cy.get('[data-cy="count"]').should('have.text', '0')
    cy.get('[role="alert"]').should('contain.text', 'Title is required.')
    cy.get('[data-cy="expense-item"]').should('not.exist')
  })

  it('rejects a negative amount', () => {
    cy.get('[data-cy="title"]').type('Bus fare')
    cy.get('[data-cy="amount"]').type('-5')
    cy.get('[data-cy="category"]').select('Travel')
    cy.get('[data-cy="add-expense"]').click()

    cy.get('[data-cy="count"]').should('have.text', '0')
    cy.get('[role="alert"]').should(
      'contain.text',
      'Amount must be greater than 0.',
    )
    cy.get('[data-cy="expense-item"]').should('not.exist')
  })
})
