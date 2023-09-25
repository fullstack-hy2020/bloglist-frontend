import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://some.url',
    likes: 1,
    user: {
      name: 'Test User'
    }
  }

  beforeEach(() => {
    const mockHandler = jest.fn()
    container = render(<Blog blog={blog} deleteBlog={mockHandler} />).container
  })

  test('shows only title and author by default', () => {
    const titleAndAuthor = screen.queryByText(`${blog.title} ${blog.author}`)
    expect(titleAndAuthor).not.toBeNull()

    const div = container.querySelector('.blog')
    expect(div).not.toBeNull()

    const url = screen.queryByText(`${blog.url}`)
    const likes = screen.queryByText(`${blog.likes}`)
    const user = screen.queryByText(`${blog.user.name}`)
    expect(url).toBeNull()
    expect(likes).toBeNull()
    expect(user).toBeNull()
  })

  test('shows details when detailed view is toggled', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const titleAndAuthor = screen.queryByText(`${blog.title} ${blog.author}`)
    const url = screen.queryByText(`${blog.url}`)
    const likes = screen.queryByText(`${blog.likes}`)
    expect(titleAndAuthor).not.toBeNull()
    expect(url).not.toBeNull()
    expect(likes).not.toBeNull()

    const div = container.querySelector('.detailed-blog')
    expect(div).not.toBeNull()
  })
})
