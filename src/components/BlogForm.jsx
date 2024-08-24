import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div>
      <h3>Add a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          <div>Title: <input value={newTitle} onChange={event => setNewTitle(event.target.value)} /></div>
          <div>Author: <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)} /></div>
          <div>Url: <input value={newUrl} onChange={event => setNewUrl(event.target.value)} /></div>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
