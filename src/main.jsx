/* eslint-disable linebreak-style */
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './components/NotificationContext'

const queryClient=new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient} >
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>

  </QueryClientProvider>


)