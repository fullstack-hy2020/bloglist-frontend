/* eslint-disable linebreak-style */
const Notification = ({ notification }) => {
  const { message, type }=notification

  if (!message) {
    return null
  }
  return (
    <div className={type}>

      {message}
    </div>
  )
}

export default  Notification