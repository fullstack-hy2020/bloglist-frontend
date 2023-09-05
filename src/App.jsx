import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  return (
    <div>
      <h2>blogs</h2>
      <Login />
    </div>
  )
}

export default App