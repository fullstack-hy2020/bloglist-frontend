import { describe, expect, test, vi } from "vitest";
import CreateBlogForm from "./CreateBlogForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('<CreateBlogForm />', () =>
{
  test('When the form submit handler called, it get approperiate arguments', async () =>
  {
    const blogData =  {
      title: 'Open-Source will make you richhhh!',
      author: 'Rohan Sharma',
      url: 'https://dev.to/rohan_sharma/open-source-will-make-you-richhhh-5gf8',
      likes: 119
    }

    const mockCreateBlogFun = vi.fn()
    render(<CreateBlogForm createBlog={mockCreateBlogFun} user='mock' />)

    const submitButton = screen.getByText('create')
    const titleInput = screen.getByPlaceholderText('blog title')
    const urlInput = screen.getByPlaceholderText('blog url')
    const authorInput = screen.getByPlaceholderText('blog author')

    const user = userEvent.setup()
    await user.type(titleInput, blogData.title)
    await user.type(urlInput, blogData.url)
    await user.type(authorInput, blogData.author)
    await user.click(submitButton)

    expect(mockCreateBlogFun.mock.calls).toHaveLength(1)
    expect(mockCreateBlogFun.mock.calls[0][0].title).toBe(blogData.title)
    expect(mockCreateBlogFun.mock.calls[0][0].url).toBe(blogData.url)
    expect(mockCreateBlogFun.mock.calls[0][0].author).toBe(blogData.author)
  })
})