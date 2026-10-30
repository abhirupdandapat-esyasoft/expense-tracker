describe('Invalid input', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('rejects an empty title', () => {
    cy.get('[data-cy="amount"]').type('100')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[data-cy="error"]').should('contain', 'Enter a title.')
    cy.get('[data-cy="expense-item"]').should('not.exist')
    cy.get('[data-cy="count"]').should('contain', '0 expenses shown')
  })

  it('rejects a negative amount', () => {
    cy.get('[data-cy="title"]').type('Lunch')
    cy.get('[data-cy="amount"]').type('-50')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[data-cy="error"]').should('contain', 'Enter an amount greater than 0.')
    cy.get('[data-cy="expense-item"]').should('not.exist')
    cy.get('[data-cy="total"]').should('contain', '0.00')
  })
})
