describe('BlogList app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3003')
  })

  it('shows login component on first visit', function() {
    cy.visit('http://localhost:3003')
    cy.contains('Log in')
  })
})