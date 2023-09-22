import { useEffect, useState } from "react"
import blogsService from '../services/blogs'

const Blog = ({ blog }) => <div> {blog.title} {blog.author} </div>

const Blogs = () => {
  const [blogs, setBlogs]  = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogsService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const create = async event => {
    event.preventDefault()
    console.log('create new blog!')
    console.log(title)
    console.log(author)
    console.log(url)
  }

  const handleChange = (callback) => (event) => callback(event.target.value)

  return (
    <div>
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
      <h3>Saved Blogs</h3>
      <div>
        {blogs.map(blog => <Blog key={blog.title} blog={blog} />)}
      </div>
    </div>
  )
}

export default Blogs