import Dashboard from "./components/home/Dashboard";
import Login from "./components/auth/Login";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const auth = useSelector((state) => state.auth);

  return <Router>{auth.success ? <Dashboard /> : <Login />}</Router>;
};

export default App;
