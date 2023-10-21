import { useState, useEffect } from "react";
import Dashboard from "./components/home/Dashboard";
import Notification from "./components/shared/Notification";
import Login from "./components/auth/Login";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [entrypoint, setEntrypoint] = useState("");

  useEffect(() => {
    if (loggedIn) {
      setEntrypoint(<Dashboard setLoggedIn={setLoggedIn} />);
    } else {
      setEntrypoint(<Login setLoggedIn={setLoggedIn} />);
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
