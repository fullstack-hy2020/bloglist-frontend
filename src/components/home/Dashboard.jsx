import { useEffect, useState } from 'react'
import BlogList from '../blogs/BlogList'

const Dashboard = ({ setLoggedIn }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    const { name } = JSON.parse(window.localStorage.getItem('user'))
    setName(name)
  }, [])

  const logout = event => {
    event.preventDefault()
    window.localStorage.clear()
    setLoggedIn(false)
  }

  return (
    <div>
      <h2>Blogs Dashboard</h2>
      <div>
        {name} logged in <button onClick={logout}>logout</button>
      </div>
      <BlogList />
    </div>
  )
}

export default Dashboard