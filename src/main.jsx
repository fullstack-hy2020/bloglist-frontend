import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { NotificationContextProvider } from "./components/shared/contexts/NotificationContext";

import blogsReducer from "./components/blogs/reducers/blogsReducer";
import authReducer from "./components/auth/reducers/authReducer";
import usersReducer from "./components/users/reducers/usersReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </NotificationContextProvider>
);
