import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlogList from "../blogs/BlogList";
import UserList from "../users/UserList";
import Notification from "../shared/Notification";
import { logout } from "../auth/reducers/authReducer";

const Menu = ({ auth }) => {
  const dispatch = useDispatch();

  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link to="/" style={padding}>
        Blogger
      </Link>
      <Link to="/blogs" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      <text style={padding}>{auth.user.name}</text>
      <button style={padding} onClick={() => dispatch(logout())}>
        logout
      </button>
    </div>
  );
};

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  if (auth === null) return;

  return (
    <Router>
      <Menu auth={auth} />
      <Notification />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default Dashboard;
