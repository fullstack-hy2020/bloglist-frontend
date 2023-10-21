import { useState, useEffect } from "react";
import Dashboard from "./components/home/Dashboard";
import Notification from "./components/shared/Notification";
import Login from "./components/auth/Login";
import { useSelector } from "react-redux";

const App = () => {
  const [entrypoint, setEntrypoint] = useState("");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.success === true) {
      setEntrypoint(<Dashboard />);
    } else {
      setEntrypoint(<Login />);
    }
  }, [auth]);

  return (
    <div>
      <Notification />
      {entrypoint}
    </div>
  );
};

export default App;
