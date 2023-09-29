describe('BlogList app', function() {
  const user = {
    username: 'testUser',
    name: 'Test User',
    password: 'securePwd'
  }

  beforeEach(function() {
    const resetUrl = 'http://localhost:3003/api/testing/reset'
    cy.request('POST', resetUrl)

    const newUserUrl = 'http://localhost:3003/api/users'
    cy.request('POST', newUserUrl, user)

    cy.visit('http://localhost:3003')
  })

  it('shows login component on first visit', function() {
    cy.visit('http://localhost:3003')
    cy.contains('Log in')
  })

  it('shows error on unsuccessful login', function() {
    cy.visit('http://localhost:3003')
    cy.get('#username').type('fakeUser')
    cy.get('#password').type('fakePass')
    cy.get('#login').click()

    cy.contains(`Invalid username or password. Try again.`)
  })

  it('logs in successfully with correct credentials', function() {
    cy.visit('http://localhost:3003')
    cy.get('#username').type(user.username)
    cy.get('#password').type(user.password)
    cy.get('#login').click()

    cy.contains(`${user.name} logged in`)
  })
})