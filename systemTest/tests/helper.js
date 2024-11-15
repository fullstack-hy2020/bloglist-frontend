const { timeout } = require("../playwright.config")

const userLoginEvnet = async(page, username, password) =>
{
  await page.locator('#username').fill(username)
  await page.locator('#password').fill(password)
  await page.getByText('Login').click()
}

const userCreateBlogEvent = async(page, blogData) =>
{
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByPlaceholder('blog title')
    .fill(blogData.title)
  await page.getByPlaceholder('blog url')
    .fill(blogData.url)
  await page.getByPlaceholder('blog author')
    .fill(blogData.author)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByRole('heading', { name: blogData.title }).waitFor()
}

const userCreateBlogWithLikesEvent = async(page, blogData, likes) =>
{
  await userCreateBlogEvent(page, blogData)
  const blogElement = await page.getByRole('heading', { name: blogData.title }).locator('../..')
  await blogElement.getByRole('button', { name: 'view' }).click()

  let likesCounter = 0
  while(likes--)
  {
    await blogElement.getByRole('button', { name: 'Like' }).click()
    likesCounter++
    await blogElement.getByText(`Likes: ${likesCounter}`, { exact: false }, { timeout: 15000 }).waitFor()
  }
}

const systemTestHelper = {
  userLoginEvnet,
  userCreateBlogEvent,
  userCreateBlogWithLikesEvent
}

module.exports = systemTestHelper