import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container, mockDelete, mockLike

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
    mockDelete = jest.fn()
    mockLike = jest.fn()
    container = render(<Blog blog={blog} deleteBlog={mockDelete} likeBlog={mockLike} />).container
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

    const div = container.querySelector('.blog-detailed')
    expect(div).not.toBeNull()
  })

  test('likes are incremented when like button is clicked', async () => {
    const likesBefore = blog.likes
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)

    const expectedLikes = likesBefore + 1
    const actualLikes = screen.queryByText(`${expectedLikes}`)
    expect(actualLikes).not.toBeNull()
  })

  test('likes are updated in backend from parent component when like button is clicked twice', async () => {
    const likesBefore = blog.likes
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    expect(mockLike.mock.calls).toHaveLength(1)

    await user.click(likeButton)
    expect(mockLike.mock.calls).toHaveLength(2)
  })
})
