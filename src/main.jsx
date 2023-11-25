import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { NotificationContextProvider } from './components/shared/contexts/NotificationContext'

import blogsReducer from "./components/blogs/reducers/blogsReducer";
import authReducer from "./components/auth/reducers/authReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    auth: authReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </NotificationContextProvider>
);
