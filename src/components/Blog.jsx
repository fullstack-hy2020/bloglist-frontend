import { useState } from "react"
const BlogDetails = (props) =>
{
  const { blog, incrementBlogLikes, removeBlog } = props
  const { url, likes, user } = blog

  const removeBlogHandler = async () =>
  {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(confirm) await removeBlog(blog.id)
  }

  return (
    <>
      <a href={url}>{url}</a>
      <p>Likes: {likes} <button onClick={() => incrementBlogLikes(blog) }>Like</button></p>
      <p><strong>{user? user.name : null}</strong></p>
      {user ? <button onClick={removeBlogHandler}>remove</button> : null}
    </>
  )
}
const Blog = ({ blog, incrementBlogLikes, removeBlog }) =>
{
  const [view, setView] = useState(false)
  const { title, author } = blog
  const toggleView = () =>
  {
    setView(!view)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog-item">
      <div>
        <h4>{title} - {author}</h4><button onClick={toggleView}>{view? 'hide' : 'view'}</button>
      </div>
      { view? <BlogDetails blog={blog} incrementBlogLikes = { incrementBlogLikes } removeBlog={removeBlog} /> : null }
    </div>
  )
}

export default Blog