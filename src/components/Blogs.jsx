import Blog from "./Blog"

const Blogs = (props) =>
{
  const { blogs, user, incrementBlogLikes, removeBlog } = props
  if(!user) return
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} incrementBlogLikes = { incrementBlogLikes } removeBlog={ removeBlog } />
      )}
    </div>
  )
}

export default Blogs