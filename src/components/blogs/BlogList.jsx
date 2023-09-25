import { useEffect, useState } from 'react'
import _ from 'lodash'
import { setStateTimeout } from '../../utils/helpers'
import blogsService from '../../services/blogs'
import Notification from '../shared/Notification'
import Blog from './Blog'
import BlogForm from './BlogForm'


const BlogList = () => {
  const [blogs, setBlogs]  = useState([])
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogsService.getAll()
      .then(blogs => setBlogs(_.orderBy(blogs, 'likes', 'desc')))
  }, [])

  const deleteBlog = blog => async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      const id = blog.id
      let type = 'success'
      let message = 'Blog deleted successfully'

      try {
        await blogsService.del(id)
        const newBlogs = blogs.filter(blog => blog.id !== id)
        setBlogs(newBlogs)
      } catch {
        type = 'error'
        message = 'Failed to delete blog'
      } finally {
        setStateTimeout(<Notification type={type} message={message} />, setNotification, 3000)
      }
    }
  }

  return (
    <div>
      <BlogForm setBlogs={setBlogs} existingBlogs={blogs} />
      <h3>Saved Blogs</h3>
      <div>{notification}</div>
      <div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog}/>)}
      </div>
    </div>
  )
}

export default BlogList