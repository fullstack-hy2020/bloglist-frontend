describe('BlogList app', function() {
  const user = {
    username: 'testUser',
    name: 'Test User',
    password: 'securePwd'
  }

  describe('When logging in', function() {
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
      cy.get('#login-button').click()
  
      cy.contains(`Invalid username or password. Try again.`)
    })
  
    it('logs in successfully with correct credentials', function() {
      cy.visit('http://localhost:3003')
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
  
      cy.contains(`${user.name} logged in`)
    })
  })

  describe('When logged in', function() {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://some.url',
      likes: 1,
      user: {
        name: 'Test User'
      }
    }

    beforeEach(function() {
      const resetUrl = 'http://localhost:3003/api/testing/reset'
      cy.request('POST', resetUrl)
  
      const newUserUrl = 'http://localhost:3003/api/users'
      cy.request('POST', newUserUrl, user)
  
      cy.visit('http://localhost:3003')
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
    })
  
    it('allows user to create blog', function() {
      cy.get('#new-blog-toggle').click()
      cy.get('#title-input').type(blog.title)
      cy.get('#author-input').type(blog.author)
      cy.get('#url-input').type(blog.url)
      cy.get('#create-button').click()

      cy.contains('Blog created successfully')
      cy.contains(`${blog.title} ${blog.author}`)
    })

    it('allows user to like a blog', function() {
      cy.get('#new-blog-toggle').click()
      cy.get('#title-input').type(blog.title)
      cy.get('#author-input').type(blog.author)
      cy.get('#url-input').type(blog.url)
      cy.get('#create-button').click()
      cy.get('#view-button').click()

      cy.get('#blog-likes').contains('0')
      cy.get('#like-button').click()
      cy.get('#blog-likes').contains('1')
    })

    it('allows user to delete a blog', function() {
      cy.on('window:confirm', () => true)
      cy.get('#new-blog-toggle').click()
      cy.get('#title-input').type(blog.title)
      cy.get('#author-input').type(blog.author)
      cy.get('#url-input').type(blog.url)
      cy.get('#create-button').click()
      cy.contains('Blog created successfully')
      cy.contains(`${blog.title} ${blog.author}`)

      cy.get('#view-button').click()
      cy.get('.blog-detailed')
      cy.get('#remove-button').click()

      cy.wait(1000)
      cy.get('.blog-detailed').should('not.exist')
    })
  })
})