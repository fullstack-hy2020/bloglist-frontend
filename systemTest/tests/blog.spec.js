const { test, expect, beforeEach, describe } = require('@playwright/test')
const systemTestHelper = require('./helper')
const { timeout } = require('../playwright.config')
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3030/api/test/reset')
    await request.post('http://localhost:3030/api/users', {
      data: {
        name: 'Ahmed Al-3adl',
        username: 'AhmedMohamed',
        password: 'ahmed444'
      }
    })
    await request.post('http://localhost:3030/api/users', {
      data: {
        name: 'Ahmed Fawzy',
        username: 'AhmedFawzy',
        password: 'ahmed2002'
      }
    })
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  })

  test('Login form is shown', async ({ page }) => {
    await expect(await page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await systemTestHelper.userLoginEvnet(page, 'AhmedMohamed', 'ahmed444')
      await expect(await page.getByText('Ahmed Al-3adl logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await systemTestHelper.userLoginEvnet(page, 'AhmedMohamed', 'ahmed44')
      await expect(await page.getByText('Wrong with credintials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await systemTestHelper.userLoginEvnet(page, 'AhmedMohamed', 'ahmed444')
    })
  
    test('a new blog can be created', async({ page }) => {
      const blogData = {
        title: '9 Open Source Libraries to Supercharge Your Next Project',
        url: 'https://dev.to/arindam_1729/9-open-source-libraries-to-supercharge-your-next-project-c71',
        author: 'Arindam Majumder'
      }
      await systemTestHelper.userCreateBlogEvent(page, blogData)
      await expect(await page.getByText('a new blog 9 Open Source Libraries to Supercharge Your Next Project by Arindam Majumder added'))
        .toBeVisible()
      await expect(await page.getByRole('heading', { name: '9 Open Source Libraries to' }))
        .toBeVisible()
    })

    describe('When blog is already created', () =>
    {
      beforeEach( async({ page }) =>
      {
        const blogData = {
          title: '9 Open Source Libraries to Supercharge Your Next Project',
          url: 'https://dev.to/arindam_1729/9-open-source-libraries-to-supercharge-your-next-project-c71',
          author: 'Arindam Majumder'
        }
        await systemTestHelper.userCreateBlogEvent(page, blogData)
      })

      test('blog can liked', async({ page }) =>
      {
        await page.getByRole('button', { name: 'view' } ).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(await page.getByText('Likes: 1', { exact: false }, { timeout: 15000 })).toBeVisible()
      })

      test('user can delete their blog', async({ page }) =>
      {
        page.on('dialog', async (dialog) => 
        {
          await dialog.accept()
          expect(dialog.type()).toBe('confirm')
        });
        await page.getByRole('button', { name: 'view' } ).click()
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(await page.getByRole('heading', { name: '9 Open Source Libraries to' })).not.toBeVisible()
      })

      test('user who didn\'t create the blog, can\'t delete it', async({ page }) =>
      {
        page.on('dialog', async (dialog) => 
        {
          expect(dialog.type()).toBe('confirm')
          await dialog.accept()
        });

        await page.getByRole('button', { name: 'logout' }).click()
        await systemTestHelper.userLoginEvnet(page, 'AhmedFawzy', 'ahmed2002')
        await page.getByRole('button', { name: 'view' } ).click()
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(await page.getByText('You don\' have the permision to delete this blog', { exact: false })).toBeVisible()
      })
    })

    describe('When number of blogs already created', () =>
    {
      beforeEach( async({ page }) =>
      {
        const blogs = [
          {
            title: 'Git Tricks You Should Know: Aliases, Bisect, and Hooks for Better Workflow',
            url: 'https://dev.to/atlantis/git-tricks-you-should-know-aliases-bisect-and-hooks-for-better-workflow-2ekj',
            author: 'Atlantis'
          },
          {
            title: 'Vim: Minimalist Environment',
            url: 'https://dev.to/salanoid/vim-minimalist-environment-2p9d',
            author: 'Salajan Silviu'
          },
          {
            title: 'Computer Networking - Full Course',
            url: 'https://dev.to/vignesh_j/computer-networking-full-course-5c80',
            author: 'Vignesh J'
          }
        ]
        
        await systemTestHelper.userCreateBlogWithLikesEvent(page, blogs[1], 2)
        await systemTestHelper.userCreateBlogWithLikesEvent(page, blogs[0], 3)
        await systemTestHelper.userCreateBlogWithLikesEvent(page, blogs[2], 1)
      })

      test('The blogs ordered from the most liked to the lowes', async({ page }) =>
      {
        const blogs = await page.locator('.blog-item').all()
        await expect(await blogs[0].getByRole('heading', { name: 'Git Tricks You Should Know: Aliases' })).toBeVisible()
        await expect(await blogs[1].getByRole('heading', { name: 'Vim: Minimalist Environment' })).toBeVisible()
        await expect(await blogs[2].getByRole('heading', { name: 'Computer Networking - Full Course' })).toBeVisible()
      })
    })
  })
})