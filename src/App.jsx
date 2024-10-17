/* eslint-disable linebreak-style */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/loginService'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [notification, setNotification] = useState([])
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    sortedBlogs(blogs),[]
  })
 

  const addBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility()
    try {
      const result = await blogService.create({ title, author, url })
      console.log('newBlog ', result)
      const newBlog=result
      newBlog.user={
        id: result.user,
        username:user.username
      }
      console.log('newBlog ', newBlog)
      setBlogs((blogs) => blogs.concat(result))


      setNotification({
        message: `a new blog ${title} by ${author} added`,
        type: 'info',
      })
      setTimeout(() => {
        setNotification([])
      }, 3000)
    } catch (error) {
      setNotification({ message: `${error}`, type: 'error' })
      setTimeout(() => {
        setNotification([])
      }, 3000)
    }
  }
  const updateBlogLike=async(blog) => {
    try {
      const result=await blogService.updateBlog(blog)
      console.log(' updated blog result ', result)
      const updatedBlog=result
      console.log(' updated blog result ', updatedBlog)
      updatedBlog.user={
        id: result.user,
        username:user.username
      }
      setBlogs((blogs) => blogs.map(b => b.id===blog.id?updatedBlog:b))

    } catch (error) {
      setNotification({ message: `${error}`, type: 'error' })
      setTimeout(() => {
        setNotification([])
      }, 3000)
    }

  }
  const deleteBlog=async (blog) => {
    let message=null
    try {
      const deletedBlog=await blogService.deleteBlog(blog)
      console.log('deleted Blog ', deletedBlog)
      sortedBlogs(blogs.filter(b => b.id.toString() !== blog.id.toString()))

      message= { message:`${blog.title} is deleted `, type: 'info' }
    } catch (error) {
      message= { message: `${error}`, type: 'error' }




    }

    setNotification( message)
    setTimeout(() => {
      setNotification([])
    }, 3000)
  }

  const sortedBlogs=(blogs) => {
    const sblog= blogs.sort((a, b) => b.likes - a.likes)
    console.log('sorted blogs ', sblog)
    setBlogs(sblog)
  }
  const onLogin = async (username, password) => {
    try {
      console.log(username)
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user) // Set the user state with the returned user data
      // Optionally save user info to local storage
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      let message = ''
      if (error.response && error.response.status === 401) {
        message = 'wrong username or password'
      }

      const myMessage = {
        message: message,
        type: 'error',
      }
      setNotification(myMessage)
      setTimeout(() => {
        setNotification([])
      }, 3000)
    }
  }

  if (user === null)
    return (
      <div>
        <Notification notification={notification} />
        <Togglable buttonLabel={'Login'}>
          <Login handleLogin={onLogin} />
        </Togglable>
      </div>
    )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />

      <div>
        {user?.username} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogUser')
            setUser(null)
          }}
        >
          logout
        </button>{' '}
      </div>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <NewBlog createNewBlog={addBlog} />
        </Togglable>
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog}
              handleLike={updateBlogLike} handleRemove={deleteBlog} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
