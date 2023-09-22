import Blogs from './Blogs'

const Dashboard = ({ user }) => {
  return (
    <div>
      <h3>Blogs</h3>
      <p>{user.name} logged in</p>
      <Blogs token={user.token} />
    </div>
  )
}

export default Dashboard