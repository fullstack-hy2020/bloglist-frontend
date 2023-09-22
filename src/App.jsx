import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [entrypoint, setEntrypoint] = useState('')

  useEffect(() => {
    if(loggedIn){
      setEntrypoint(<Dashboard />)
    }else{
      setEntrypoint(<Login setLoggedIn={setLoggedIn}/>)
    }
  }, [loggedIn])

  return entrypoint
}

export default App