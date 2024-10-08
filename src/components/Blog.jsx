/* eslint-disable linebreak-style */
import Togglable from './Togglable'
const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const incrementLike = (event) => {
    event.preventDefault()
    handleLike(blog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (confirm(`Remove blog  ${blog.title}`)) {
      handleRemove(blog)
    }
  }
  return (
    <div style={blogStyle}>
    <div className='blog' >{blog.title} </div>
      <Togglable buttonLabel="view" buttonHide="hide">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={incrementLike}>like</button>
        </div>
        <div>{blog.author}</div>

        {user.username === blog.user.username && (
          <div style={{ marginTop: 5 }}>
            <button style={{ backgroundColor: '#0089ff' }} onClick={deleteBlog}>
              remove
            </button>
          </div>
        )}
      </Togglable>
    </div>
  )
}

export default Blog
