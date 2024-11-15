const Notification = (props) =>
{
  const { notification } = props
  if(!notification) return
  let style = { color: 'green' }
  !notification[0]
    ? style.color = 'red' : true
  return (
    <p style={style}>{notification}</p>
  )
}

export default Notification