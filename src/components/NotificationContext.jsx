/* eslint-disable linebreak-style */
import { createContext, useContext,useReducer  } from 'react'

// Initial state
const initialState = {
  notifications: null,
}
// Action types
const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

// Reducer function
const notificationReducer = (state, action) => {
  switch (action.type) {
  case ADD_NOTIFICATION:
    return {
      ...state,
      notifications:action.payload
    }
  case REMOVE_NOTIFICATION:
    return {
      ...state,
      notifications: null
    }
  default:
    return state
  }
}
const NotificationContext = createContext()

// export const useNotificationValue=() => {
//   const messageAndDespatch=useContext(NotificationContext)
//   return messageAndDespatch[0]
// }

// export const useNotificationDispatch=() => {
//   const messageAndDespatch=useContext(NotificationContext)
//   return messageAndDespatch[1]
// }

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  const addNotification = (notification) => {
    if(!notification) return
    console.log('Notification Context ',  notification)
    notificationDispatch({ type: ADD_NOTIFICATION, payload: notification })

    console.log('notifications ', notification )
    setTimeout(() => {
      removeNotification(notification.id)
    }, 3000)
  }

  const removeNotification = () => {
    notificationDispatch({ type: REMOVE_NOTIFICATION })
  }
  return (
    <NotificationContext.Provider value={{ notification, addNotification, removeNotification } }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}
//export default  NotificationContext