import { render, screen } from '@testing-library/react'
import NewBlog from './NewBlog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('<NewBlog />  when a new blog is created', async () => {
  const createNewBlog = vi.fn()
  const user = userEvent.setup()
 const {container}= render(<NewBlog createNewBlog={createNewBlog} />)

const titleInput = container.querySelector('#blog-title')

 // Get input fields

 const authorInput =  container.querySelector('#blog-author')
 const urlInput = container.querySelector('#blog-url')
 const sendButton = screen.getByText('Save');


 await user.type(titleInput, 'Testing Title')
await user.type(authorInput, 'Testing Author');
await user.type(urlInput, 'https://example.com');
await user.click(sendButton);

// Check that createNewBlog was called with the correct arguments
expect(createNewBlog).toHaveBeenCalledTimes(1);
expect(createNewBlog).toHaveBeenCalledWith('Testing Title', 'Testing Author','https://example.com');
})


test('test me', async () => {
    const createNewBlog = vi.fn();
  
    render(<NewBlog createNewBlog={createNewBlog} />);
    const input = screen.getByPlaceholderText('write title content here');
    const sendButton = screen.getByText('Save');
  
    await userEvent.type(input, 'test new blog');
    await userEvent.click(sendButton);
  
    expect(createNewBlog.mock.calls).toHaveLength(1);
    expect(createNewBlog.mock.calls[0][0]).toBe('test new blog'); // Access the first argument of the first call
  });