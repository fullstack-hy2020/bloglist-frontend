import { useSelector } from "react-redux";

const Notification = () => {
  const { display, type, message } = useSelector((state) => state.notification);

  const style = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    display: display,
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
    <div id="notification" style={styles[type]}>
      {message}
    </div>
  );
};

export default Notification;
