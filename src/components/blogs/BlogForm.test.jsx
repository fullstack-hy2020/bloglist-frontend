import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const fakeBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://some.url'
  }

  test('submits correct information to the parent createBlog function', async () => {
    const mockSet = jest.fn()
    const mockCreate = jest.fn(blog => {
      expect(blog).toBeDefined()
      expect(blog.title).toBe(fakeBlog.title)
      expect(blog.author).toBe(fakeBlog.author)
      expect(blog.url).toBe(fakeBlog.url)
      return blog
    })

    render(<BlogForm setBlogs={mockSet} existingBlogs={[]} createBlog={mockCreate} />)

    const titleInput = screen.getByLabelText('Title:')
    const authorInput = screen.getByLabelText('Author:')
    const urlInput = screen.getByLabelText('Url:')

    const user = userEvent.setup()
    await user.type(titleInput, fakeBlog.title)
    await user.type(authorInput, fakeBlog.author)
    await user.type(urlInput, fakeBlog.url)

    const submitButton = screen.getByText('create')
    await user.click(submitButton)

    const successNotification = screen.queryByText('Blog created successfully')
    expect(successNotification).not.toBeNull()
  })
})
