import { useState } from "react"

const CreateBlogForm = (props) =>
{
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const { createBlog , user, setNotification } = props

  const creatingBlogHandler = async(event) =>
  {
    event.preventDefault()
    try
    {
      const blogObj = { title, url, author }
      await createBlog(blogObj)
      setTitle('')
      setUrl('')
      setAuthor('')
    }
    catch(error)
    {
      console.log({ error })
      setNotification([false, 'Invalid token'])
      setTimeout(() => setNotification(null), 5000)
    }

  }
  if(!user) return

  return (
    <>
      <h2>create new blog item</h2>
      <form onSubmit={(event) => creatingBlogHandler(event)}>
        <label htmlFor="title">title:</label>
        <input type="text" id="title" placeholder="blog title" value={title} onChange={({ target }) => setTitle(target.value)}/>
        <br />
        <label htmlFor="url">url:</label>
        <input type="text" id="url" value={url} placeholder="blog url" onChange={({ target }) => setUrl(target.value)}/>
        <br />
        <label htmlFor="author">author:</label>
        <input type="text" id="author" value={author} placeholder="blog author" onChange={({ target }) => setAuthor(target.value)}/>

        <br />

        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateBlogForm