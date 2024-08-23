import { useState } from 'react'

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false);

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    maxWidth: 500
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
      <strong>{blog.title}</strong> by {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
      <strong>{blog.title}</strong> by {blog.author} <button onClick={toggleVisibility}>hide</button><br />
      Url: {blog.url}<br />
      Likes: {blog.likes} <button>like</button><br />
      Added by: {blog.user.name}
      </div>
    </div>
  )
}

export default Blog