import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPlokiappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedPlokiappUser', JSON.stringify(user)
      )
      setNotification('Login successful')
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('ERROR: Wrong username or password')
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await blogService
      .create(blogObject)
      .then(returnedBlog => {
        setNotification(`"${returnedBlog.title}" by ${returnedBlog.author} was added to list`)
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch (error => {
        setNotification('ERROR: all fields must be filled in and be min. 3 characters long')
      })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const updateLikes = (blog) => {
    console.log('blog', blog.id)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    console.log('updated', updatedBlog)

    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        console.log('returnedBlog', returnedBlog)
        setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : returnedBlog))
      })
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const logoutButton = () => {
    window.localStorage.removeItem('loggedPlokiappUser')
    setUser(null)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message.includes("ERROR")) {
      return (
        <div className="error">
          {message}
        </div>
      )
    } else {
        return (
          <div className="success">
            {message}
          </div>
        )
      }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        <LoginForm
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      <div className="user">
        {user.name} logged in
        <button onClick={logoutButton}>logout</button>
      </div>
      <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div className='bloglist'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={() => updateLikes(blog)}/>
        )}
      </div>
    </div>
  )
}

export default App