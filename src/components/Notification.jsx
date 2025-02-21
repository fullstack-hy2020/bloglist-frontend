/* eslint-disable linebreak-style */
// NotificationList.js
import React from 'react'
import { useNotification } from './NotificationContext'


const NotificationList = () => {
  const { notification } = useNotification()
  const { type, message } = notification?.notifications || {}
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default NotificationList