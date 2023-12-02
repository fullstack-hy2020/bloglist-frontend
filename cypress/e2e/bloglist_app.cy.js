describe("BlogList app", function () {
  const user = {
    username: "testUser",
    name: "Test User",
    password: "securePwd",
  };

  const user2 = {
    username: "testUser2",
    name: "Test User2",
    password: "securePwd",
  };

  describe("When logging in", function () {
    beforeEach(function () {
      const resetUrl = "http://localhost:3003/api/testing/reset";
      cy.request("POST", resetUrl);

      const newUserUrl = "http://localhost:3003/api/users";
      cy.request("POST", newUserUrl, user);

      cy.visit("http://localhost:3003");
    });

    it("shows login component on first visit", function () {
      cy.visit("http://localhost:3003");
      cy.contains("Log in");
    });

    it("shows error on unsuccessful login", function () {
      cy.visit("http://localhost:3003");
      cy.get("#username").type("fakeUser");
      cy.get("#password").type("fakePass");
      cy.get("#login-button").click();

      cy.contains(`Invalid username or password. Try again.`);
    });

    it("logs in successfully with correct credentials", function () {
      cy.visit("http://localhost:3003");
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-button").click();

      cy.contains(`${user.name}`);
    });
  });

  describe("When logged in", function () {
    const blog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://some.url",
    };

    const blog2 = {
      title: "Test Blog2",
      author: "Test Author2",
      url: "http://some.url2",
    };

    beforeEach(function () {
      const resetUrl = "http://localhost:3003/api/testing/reset";
      cy.request("POST", resetUrl);

      const newUserUrl = "http://localhost:3003/api/users";
      cy.request("POST", newUserUrl, user);
      cy.request("POST", newUserUrl, user2);

      cy.visit("http://localhost:3003");
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-button").click();
    });

    it("allows user to create blog", function () {
      cy.get("#new-blog-toggle").click();
      cy.get("#title-input").type(blog.title);
      cy.get("#author-input").type(blog.author);
      cy.get("#url-input").type(blog.url);
      cy.get("#create-button").click();

      cy.contains("Blog created successfully");
      cy.contains(`${blog.title} ${blog.author}`);
    });

    it("does not allow user to create blog with invalid author", function () {
      cy.get("#new-blog-toggle").click();
      cy.get("#title-input").type(blog.title);
      cy.get("#author-input").type("t");
      cy.get("#url-input").type(blog.url);
      cy.get("#create-button").click();

      cy.contains("Failed to create blog");
      cy.get(".blog").should("not.exist");
    });

    it("allows user to like a blog", function () {
      cy.get("#new-blog-toggle").click();
      cy.get("#title-input").type(blog.title);
      cy.get("#author-input").type(blog.author);
      cy.get("#url-input").type(blog.url);
      cy.get("#create-button").click();
      cy.get("#view-button").click();

      cy.get("#blog-likes").contains("0");
      cy.get("#like-button").click();
      cy.get("#blog-likes").contains("1");
    });

    it("sorts blogs by most likes first", function () {
      cy.get("#new-blog-toggle").click();
      cy.get("#title-input").type(blog.title);
      cy.get("#author-input").type(blog.author);
      cy.get("#url-input").type(blog.url);
      cy.get("#create-button").click();

      cy.get("#new-blog-toggle").click();
      cy.get("#title-input").type(blog2.title);
      cy.get("#author-input").type(blog2.author);
      cy.get("#url-input").type(blog2.url);
      cy.get("#create-button").click();
      cy.wait(1000);

      cy.get(".blog")
        .contains(`${blog2.title} ${blog2.author}`)
        .within(() => {
          cy.get("#view-button").click();
        });

      cy.get("#blog-likes").contains("0");
      cy.get("#like-button").click();
      cy.get("#blog-likes").contains("1");
      cy.get("#hide-blog-button").click();
      cy.wait(1000);

      cy.get(".blog").eq(0).should("contain", `${blog2.title} ${blog2.author}`);
      cy.get(".blog").eq(1).should("contain", `${blog.title} ${blog.author}`);
    });

    it("allows user to delete a blog", function () {
      cy.on("window:confirm", () => true);
      cy.get("#new-blog-toggle").click();
      cy.get("#title-input").type(blog.title);
      cy.get("#author-input").type(blog.author);
      cy.get("#url-input").type(blog.url);
      cy.get("#create-button").click();
      cy.contains("Blog created successfully");
      cy.contains(`${blog.title} ${blog.author}`);

      cy.get("#view-button").click();
      cy.get(".blog-detailed");
      cy.get("#remove-button").click();
      cy.get(".blog-detailed").should("not.exist");
    });

    it("does not show user delete button for blogs they do not own", function () {
      cy.on("window:confirm", () => true);
      cy.get("#new-blog-toggle").click();
      cy.get("#title-input").type(blog.title);
      cy.get("#author-input").type(blog.author);
      cy.get("#url-input").type(blog.url);
      cy.get("#create-button").click();
      cy.visit("http://localhost:3003");
      cy.get("#username").type(user2.username);
      cy.get("#password").type(user2.password);
      cy.get("#login-button").click();

      cy.get("#view-button").click();
      cy.get("#remove-button").should("not.exist");
    });
  });
});
