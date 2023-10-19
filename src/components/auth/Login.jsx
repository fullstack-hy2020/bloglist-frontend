import { useState } from "react";
import helpers from "../../utils/helpers";
import loginService from "../../services/login";
import Notification from "../shared/Notification";

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
      helpers.setStateTimeout(
        <Notification
          type={"error"}
          message={"Invalid username or password. Try again."}
        />,
        setError,
        3000,
      );
    }
  };

  const handleChange = (callback) => (event) => callback(event.target.value);

  return (
    <div>
      <h2>Log in</h2>
      <div>{error}</div>
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
