import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
import BlogList from "../blogs/BlogList";
import UserList from "../users/UserList";
import User from "../users/User";
import Notification from "../shared/Notification";
import { logout } from "../auth/reducers/authReducer";

const Menu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
      <text style={padding}>{user.name}</text>
      <button style={padding} onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  const match = useMatch("/users/:id");
  const matchedUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  if (auth === null) return;

  return (
    <div>
      <Menu user={auth.user} />
      <Notification />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
