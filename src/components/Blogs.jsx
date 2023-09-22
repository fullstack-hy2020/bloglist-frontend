import { useEffect, useState } from "react"
import blogsService from '../services/blogs'

const Blog = ({ blog }) => <div> {blog.title} {blog.author} </div>

const Blogs = ({ token }) => {
  const [blogs, setBlogs]  = useState([])

  useEffect(async () => {
    const blogs = await blogsService.getAll(token)
    setBlogs(blogs)
  }, [])

  return blogs.map(blog => <Blog blog={blog} />)
}

export default Blogs