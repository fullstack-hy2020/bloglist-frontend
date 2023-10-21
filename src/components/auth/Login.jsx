import { useState } from "react";
import loginService from "./services/login";
import Notification from "../shared/Notification";
import { setNotification } from "../shared/reducers/notificationReducer";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login(username, password);

      window.localStorage.setItem("user", JSON.stringify(user));
      setLoggedIn(true);
    } catch (error) {
      setNotification("Invalid username or password. Try again.", 5);
    }
  };

  const handleChange = (callback) => (event) => callback(event.target.value);

  return (
    <div>
      <h2>Log in</h2>
      <Notification />
      <form onSubmit={login}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="Username"
            onChange={handleChange(setUsername)}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="Password"
            onChange={handleChange(setPassword)}
            value={password}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
