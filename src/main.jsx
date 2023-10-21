import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./components/shared/reducers/notificationReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
