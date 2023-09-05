import { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  const handleChange = (callback) => (event) => callback(event.target.value)

  return (
    <div>
      <h3>Log in</h3>
      <form onSubmit={handleLogin}>
        <div>
          username 
          <input 
            type='text'
            name='Username'
            onChange={handleChange(setUsername)}
            value={username}/>
        </div>
        <div>
          password
          <input 
            type='password'
            name='Password'
            onChange={handleChange(setPassword)}
            value={password}/>
        </div>
        <button onClick={handleLogin}>login</button>
      </form>
    </div>
  )
}

export default Login