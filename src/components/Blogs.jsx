import { useEffect, useState, useRef } from "react"
import blogsService from '../services/blogs'
import Notification from "./Notification"
import Togglable from "./Togglable"

const Blog = ({ blog, deleteBlog }) => <div> {blog.title} {blog.author} <button onClick={deleteBlog(blog.id)}>delete</button></div>

const notify = (type, message, setNotification) => {
  setNotification(<Notification type={type} message={message} />)

  setTimeout(() => {
    setNotification('')
  }, 3000)
}

const NewBlog = ({ setBlogs, existingBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')

  const newBlogRef = useRef()

  const clearInputs = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    newBlogRef.current.toggleVisibility()
  }

  const create = async event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try {
      console.log(newBlog)
      const blog = await blogsService.create(newBlog)

      const newBlogs = [
        ...existingBlogs,
        blog
      ]

      setBlogs(newBlogs)
      notify('success', 'Blog created successfully', setNotification)
      clearInputs()
    }catch{
      notify('error', 'Failed to create blog', setNotification)
    }
  }

  const handleChange = (callback) => (event) => callback(event.target.value)

  return (
    <div>
      {notification}
      <Togglable buttonLabel={'New Blog'} ref={newBlogRef}>
        <h3>New Blog</h3>
        
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
      </Togglable>
    </div>
  )
}

const Blogs = () => {
  const [blogs, setBlogs]  = useState([])
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogsService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const deleteBlog = (id) => async () => {
    try {
      await blogsService.del(id)

      const newBlogs = blogs.filter(blog => blog.id !== id)

      setBlogs(newBlogs)
      notify('success', 'Blog delete successfully', setNotification)
    }catch{
      notify('error', 'Failed to delete blog', setNotification)
    }
  }

  return (
    <div>
      <NewBlog setBlogs={setBlogs} existingBlogs={blogs} />
      <h3>Saved Blogs</h3>
      <div>{notification}</div>
      <div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog}/>)}
      </div>
    </div>
  )
}

export default Blogs