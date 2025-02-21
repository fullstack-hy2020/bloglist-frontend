/* eslint-disable linebreak-style */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/loginService'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useNotification } from './components/NotificationContext'
import Notification from './components/Notification'

const App = () => {

  const blogFormRef = useRef()

  const [user, setUser] = useState(null)
  const { addNotification, removeNotification } = useNotification()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
    refetchOnWindowFocus: false,
  })
  const queryClient = useQueryClient()
  const newBlogs = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newB) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newB))
    },
  })

  const updateBlogs = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (updatedB) => {
      const blog = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blog.map((b) => (b.id === updatedB.id ? updatedB : b))
      )
    },
  })

  const removeBlogs = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_, variables) => {
      const blog = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blog.filter((b) => b.id.toString() !== variables.blog.id.toString())
      )
    },
  })

  const addBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility()
    try {
      newBlogs.mutate({ title, author, url })

      addNotification({
        type: 'info',
        message: ' Saved successfully',
      })
    } catch (error) {
      addNotification({ message: `${error}`, type: 'error' })
    }
  }
  const updateBlogLike = async (blog) => {
    try {
      updateBlogs.mutate({ blog })
      addNotification({ message: 'Updated', type: 'info' })
    } catch (error) {
      addNotification({ message: `${error}`, type: 'error' })
    }
  }
  const deleteBlog = async (blog) => {
    try {
      removeBlogs.mutate({ blog })
      addNotification({ message: `${blog.title} is deleted `, type: 'info' })
    } catch (error) {
      addNotification({ message: `${error}`, type: 'error' })
    }
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
      // setUsername('')
      //  setPassword('')
    } catch (error) {
      let message = ''
      if (error.response && error.response.status === 401) {
        message = 'wrong username or password'
      }

      const myMessage = {
        message: message,
        type: 'error',
      }
      addNotification(myMessage)
    }
  }

  if (user === null)
    return (
      <div>
        <Notification />
        <Togglable buttonLabel={'Login'}>
          <Login handleLogin={onLogin} />
        </Togglable>
      </div>
    )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {console.log(
        'result',
        result.data?.sort((a, b) => b.likes - a.likes)
      )}
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
          {result.data?.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={updateBlogLike}
              handleRemove={deleteBlog}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
