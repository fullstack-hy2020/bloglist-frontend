import { useEffect, useState } from "react"
import Blogs from './Blogs'

const Dashboard = () => {
  const [user, setUser]  = useState('')

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    setUser(user)
  }, [])

  return (
    <div>
      <h3>Blogs</h3>
      <p>{user.name} logged in</p>
      <Blogs token={user.token} />
    </div>
  )
}

export default Dashboard