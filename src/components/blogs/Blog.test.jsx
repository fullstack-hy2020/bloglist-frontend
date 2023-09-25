import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('shows only title and author by default', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://some.url',
      likes: 1,
      user: {
        name: 'Test User'
      }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} deleteBlog={mockHandler} />)

    const titleAndAuthor = screen.queryByText(`${blog.title} ${blog.author}`)
    expect(titleAndAuthor).not.toBeNull()

    const url = screen.queryByText(`${blog.url}`)
    const likes = screen.queryByText(`${blog.likes}`)
    const user = screen.queryByText(`${blog.user.name}`)
    expect(url).toBeNull()
    expect(likes).toBeNull()
    expect(user).toBeNull()
  })
})
