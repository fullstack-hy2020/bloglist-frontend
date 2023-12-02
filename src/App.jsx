import Dashboard from "./components/home/Dashboard";
import Login from "./components/auth/Login";
import { useSelector } from "react-redux";

const App = () => {
  const auth = useSelector((state) => state.auth);

  return <div>{auth.success ? <Dashboard /> : <Login />}</div>;
};

export default App;
