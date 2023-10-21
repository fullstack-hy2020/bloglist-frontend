import { useState, useEffect } from "react";
import Dashboard from "./components/home/Dashboard";
import Notification from "./components/shared/Notification";
import Login from "./components/auth/Login";
import { useSelector } from "react-redux";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [entrypoint, setEntrypoint] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user !== null) {
      window.localStorage.setItem("user", JSON.stringify(user));
      setEntrypoint(<Dashboard setLoggedIn={setLoggedIn} />);
    } else {
      setEntrypoint(<Login />);
    }
  }, [loggedIn]);

  return (
    <div>
      <Notification />
      {entrypoint}
    </div>
  );
};

export default App;
