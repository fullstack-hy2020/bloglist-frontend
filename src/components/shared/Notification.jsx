import { useNotificationObject } from "./contexts/NotificationContext";

const Notification = () => {
  const notification = useNotificationObject();

  const style = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    display: notification.display,
  };

  const styles = {
    error: {
      ...style,
      color: "red",
    },
    success: {
      ...style,
      color: "green",
    },
  };

  return (
    <div id="notification" style={styles[notification.type]}>
      {notification.message}
    </div>
  );
};

export default Notification;
