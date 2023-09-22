import { useEffect, useState } from "react"
import blogsService from '../services/blogs'
import Notification from "./Notification"

const Blog = ({ blog, deleteBlog }) => <div> {blog.title} {blog.author} <button onClick={deleteBlog(blog.id)}>delete</button></div>

const Blogs = () => {
  const [blogs, setBlogs]  = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogsService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const notify = (type, message) => {
    setNotification(<Notification type={type} message={message} />)

    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  const create = async event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try {
      const blog = await blogsService.create(newBlog)

      const newBlogs = [
        ...blogs,
        blog
      ]

      setBlogs(newBlogs)
      notify('success', 'Blog created successfully')
    }catch{
      notify('error', 'Failed to create blog')
    }
  }

  const deleteBlog = (id) => async () => {
    try {
      await blogsService.del(id)

      const newBlogs = blogs.filter(blog => blog.id !== id)

      setBlogs(newBlogs)
      notify('success', 'Blog delete successfully')
    }catch{
      notify('error', 'Failed to delete blog')
    }
  }

  const handleChange = (callback) => (event) => callback(event.target.value)

  return (
    <div>
      <h3>New Blog</h3>
      <div>{notification}</div>
      <form onSubmit={create}>
        <div>
          Title:
          <input 
            type='text'
            name='title'
            onChange={handleChange(setTitle)}
            value={title}/>
        </div>
        <div>
          Author:
          <input 
            type='text'
            name='author'
            onChange={handleChange(setAuthor)}
            value={author}/>
        </div>
        <div>
          Url:
          <input 
            type='url'
            name='url'
            onChange={handleChange(setUrl)}
            value={url}/>
        </div>
        <button type='submit'>create</button>
      </form>
      <h3>Saved Blogs</h3>
      <div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog}/>)}
      </div>
    </div>
  )
}

export default Blogs