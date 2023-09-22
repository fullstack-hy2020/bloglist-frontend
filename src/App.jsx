import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState('')
  const [entrypoint, setEntrypoint] = useState('')

  useEffect(() => {
    if(user !== ''){
      setEntrypoint(<Dashboard />)
    }else{
      setEntrypoint(<Login setUser={setUser}/>)
    }
  }, [user])

  return entrypoint
}

export default App