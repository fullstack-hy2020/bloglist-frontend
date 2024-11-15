import { render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"

describe('<Blog />', () =>
{
  test('By default Blog component dilplays the blog title and author name only', () =>
  {
    const blogData =  {
      title: 'Open-Source will make you richhhh!',
      author: 'Rohan Sharma',
      url: 'https://dev.to/rohan_sharma/open-source-will-make-you-richhhh-5gf8',
      likes: 119
    }

    render(<Blog blog={ blogData }/>)

    const titleElement = screen.queryByText('Open-Source will make you richhhh!')
    const authorElement = screen.queryByText('Rohan Sharma')

    const urlElement = screen.queryByText('https://dev.to/rohan_sharma/open-source-will-make-you-richhhh-5gf8')
    const likesElement = screen.queryByText('119')

    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
  })

  test('Likes and Url fields display when the *view* button clicked', async() =>
  {
    const blogData =  {
      title: 'Open-Source will make you richhhh!',
      author: 'Rohan Sharma',
      url: 'https://dev.to/rohan_sharma/open-source-will-make-you-richhhh-5gf8',
      likes: 119
    }

    render(<Blog blog={ blogData }/>)

    const titleElement = screen.queryByText('Open-Source will make you richhhh!')
    const authorElement = screen.queryByText('Rohan Sharma')
    const button = screen.getByText('view')

    const user = userEvent.setup()
    await user.click(button)

    const urlElement = screen.queryByText('https://dev.to/rohan_sharma/open-source-will-make-you-richhhh-5gf8')
    const likesElement = screen.queryByText('119')

    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
  })

  test('When *Like* button clicked twice, the increment function called twice', async() =>
  {
    const blogData =  {
      title: 'Open-Source will make you richhhh!',
      author: 'Rohan Sharma',
      url: 'https://dev.to/rohan_sharma/open-source-will-make-you-richhhh-5gf8',
      likes: 119
    }

    const mockIncrement = vi.fn()
    render(<Blog blog={ blogData } incrementBlogLikes={ mockIncrement }/>)
    const viewButton = screen.getByText('view')

    const user = userEvent.setup()
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockIncrement.mock.calls).toHaveLength(2)
    expect(mockIncrement.mock.calls[0][0].author).toBe('Rohan Sharma')
  })
})