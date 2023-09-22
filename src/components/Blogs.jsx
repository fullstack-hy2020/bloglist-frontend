import { useEffect, useState } from "react"
import blogsService from '../services/blogs'

const Blog = ({ blog }) => <div> {blog.title} {blog.author} </div>

const Blogs = ({ token }) => {
  const [blogs, setBlogs]  = useState([])

  useEffect(() => {
    blogsService.getAll(token)
      .then(blogs => setBlogs(blogs))
  }, [])

  return blogs.map(blog => <Blog key={blog.title} blog={blog} />)
}

export default Blogs