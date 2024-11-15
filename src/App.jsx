import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginServices from './services/login'
import Blogs from './components/Blogs'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Toggler from './components/Toggler'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  const loginSubmitHandler = async(event) =>
  {
    event.preventDefault()
    try
    {
      const user = await loginServices.login({ username, password })
      window.localStorage.setItem('userLoggedInfo', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(error)
    {
      setNotification([false, 'Wrong with credintials'])
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const logoutHandler = () =>
  {
    window.localStorage.removeItem('userLoggedInfo')
    setUser(null)
  }

  const createBlog = async(blogObj) =>
  {
    const blog = await blogService.createBlog(blogObj)
    setBlogs(blogs.concat(blog))
    blogFormRef.current.flipVisibility()
    setNotification([true, `a new blog ${blog.title} by ${blog.author} added`])
    setTimeout(() => setNotification(null), 5000)
  }

  const incrementBlogLikes = async(blogObj) =>
  {
    await blogService.updateBlog(blogObj.id, { likes: blogObj.likes + 1 })
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a, b) =>
      {
        if(a.likes >= b.likes)
        {
          return -1
        }
        return 1
      }))
  }

  const removeBlog = async(blogId) =>
  {
    try
    {
      await blogService.deleteBlog(blogId)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) =>
        {
          if(a.likes >= b.likes)
          {
            return -1
          }
          return 1
        }))
    }
    catch
    {
      setNotification(['You don\' have the permision to delete this blog', false])
    }
  }

  useEffect(() => {
    const userLoggedInfo = window.localStorage.getItem('userLoggedInfo')
    if(!userLoggedInfo) return
    const user = JSON.parse(userLoggedInfo)
    if(userLoggedInfo) setUser(user)
    blogService.setToken(user.token)
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) =>
        {
          if(a.likes >= b.likes)
          {
            return -1
          }
          return 1
        }))
    )
  }, [])

  return (
    <>
      <Notification notification={notification} />
      <LoginForm loginSubmitHandler={loginSubmitHandler}
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  user={user} />
      {
        user
          ? <>
              <h3>{user.name} logged-in</h3>
              <button onClick={logoutHandler}>logout</button>
              <br />
            </>
          : null
      }
      <Toggler buttonLable='new blog' ref={blogFormRef}>
        <CreateBlogForm createBlog={createBlog}
                        user={user}
                        setNotification = {setNotification} />
        </Toggler>
      <Blogs blogs={blogs} user={user} incrementBlogLikes = { incrementBlogLikes } removeBlog={ removeBlog } />
    </>
  )
}

export default App