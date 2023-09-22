import { useState } from 'react'
import loginService from '../services/login'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const login = async (event) => {
    event.preventDefault()
    const user = await loginService
      .login(username, password)

    window.localStorage.setItem('user', JSON.stringify(user))

    setUser(user)
  }

  const handleChange = (callback) => (event) => callback(event.target.value)

  return (
    <div>
      <h3>Log in</h3>
      <form onSubmit={login}>
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
        <button onClick={login}>login</button>
      </form>
    </div>
  )
}

export default Login