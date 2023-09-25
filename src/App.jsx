import { useState, useEffect } from 'react'
import Dashboard from './components/home/Dashboard'
import Login from './components/auth/Login'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [entrypoint, setEntrypoint] = useState('')

  useEffect(() => {
    if(loggedIn){
      setEntrypoint(<Dashboard setLoggedIn={setLoggedIn}/>)
    }else{
      setEntrypoint(<Login setLoggedIn={setLoggedIn}/>)
    }
  }, [loggedIn])

  return entrypoint
}

export default App