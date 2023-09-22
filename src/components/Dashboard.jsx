import { useEffect, useState } from "react"
import Blogs from './Blogs'

const Dashboard = ({ setLoggedIn }) => {
  const [user, setUser] = useState('')

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    setUser(user)
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
        {user.name} logged in <button onClick={logout}>logout</button>
      </div>
      <Blogs token={user.token} />
    </div>
  )
}

export default Dashboard