import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const login = async event => {
    event.preventDefault()

    try {
      const user = await loginService
        .login(username, password)
        
      window.localStorage.setItem('user', JSON.stringify(user))
      setLoggedIn(true)
    } catch (error) {
      setError(<Notification type={'error'} message={'Invalid username or password. Try again.'} />)

      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  const handleChange = (callback) => (event) => callback(event.target.value)

  return (
    <div>
      <h2>Log in</h2>
      <div>{error}</div>
      <form onSubmit={login}>
        <div>
          Username: 
          <input 
            type='text'
            name='Username'
            onChange={handleChange(setUsername)}
            value={username}/>
        </div>
        <div>
          Password:
          <input 
            type='password'
            name='Password'
            onChange={handleChange(setPassword)}
            value={password}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login