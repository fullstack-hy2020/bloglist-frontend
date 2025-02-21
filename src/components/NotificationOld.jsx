/* eslint-disable linebreak-style */


const Notification = ({ notification }) => {
  const { message, type }=notification
  // const  contextMessage= useNotificationValue()

  if (!message) {
    return null
  }
  return (
    <div className={type}>
    {/* contextMessage :  {contextMessage} */}
      {message}
    </div>
  )
}


export default  Notification