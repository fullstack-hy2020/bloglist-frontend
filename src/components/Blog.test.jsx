import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'First test component on blog',
    author: 'Tsega Tadele',
    user: {
      username: 'Tsega',
    },
  }

  const { container } = render(<Blog blog={blog} user='Tsega' />)

  screen.getByText('First test component on blog')
  screen.getByText('Tsega Tadele')

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('First test component on blog')
})

test('like button is clicked twice', async () => {
  const blog = {
    title: 'First test component on blog',
    author: 'Tsega Tadele',
    url: 'http/mytest-url.com',
    likes: 0,
    user: {
      username: 'Tsega',
    },
  }
  const handleLike = vi.fn()

  render(<Blog blog={blog} handleLike={handleLike} user="Tsega" />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(handleLike).toHaveBeenCalledTimes(2)
})

test('when blog removed', async () => {

  const blog = {
    title: 'First test component on blog',
    author: 'Tsega Tadele',
    url: 'http/mytest-url.com',
    likes: 0,
    user: {
      username: 'Tsega',
    }, }

    const handleLike = vi.fn();
    const handleRemove = vi.fn();
  
    const user = { username: 'Tsega' }; // User object that matches blog's user
  
    render(<Blog blog={blog} handleRemove={handleRemove} user={user} />);
  
    const removeButton = screen.getByText('remove');

  // Mock the confirm function
  global.confirm = vi.fn(() => true); // Simulate user confirming the deletion

  // Click the remove button
  await userEvent.click(removeButton);

  // Expect handleRemove to be called once
  expect(handleRemove).toHaveBeenCalledTimes(1);
  expect(handleRemove).toHaveBeenCalledWith(blog); // Check if it was called with the correct blog
});


