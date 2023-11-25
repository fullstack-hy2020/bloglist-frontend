import { createContext, useContext, useReducer } from "react";

const initialState = {
  message: "",
  type: "success",
  display: "none",
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return { ...action.payload, display: "" };
    case "HIDE":
      return initialState;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationObject = () => useContext(NotificationContext)[0];

export const useNotificationDispatch = () => useContext(NotificationContext)[1];

export const showNotification = (dispatch, payload) => {
  console.log(payload);
  dispatch({
    type: "SHOW",
    payload: payload,
  });
  setTimeout(() => dispatch({ type: "HIDE" }), 5 * 1000);
};

export default NotificationContext;
