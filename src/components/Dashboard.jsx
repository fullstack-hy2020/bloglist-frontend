import { useEffect, useState } from 'react'
import Blogs from './Blogs'

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
      <Blogs />
    </div>
  )
}

export default Dashboard