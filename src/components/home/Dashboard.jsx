import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
import _ from "lodash";
import { logout } from "../auth/reducers/authReducer";
import BlogList from "../blogs/BlogList";
import Blog from "../blogs/Blog";
import UserList from "../users/UserList";
import User from "../users/User";
import Notification from "../shared/Notification";

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
  const blogs = useSelector((state) => _.orderBy(state.blogs, "likes", "desc"));
  const users = useSelector((state) => state.users);

  const matchObjectByRoute = (route, list) => {
    const match = useMatch(route);
    return match ? list.find((object) => object.id === match.params.id) : null;
  };

  const matchedUser = matchObjectByRoute("/users/:id", users);
  const matchedBlog = matchObjectByRoute("/blogs/:id", blogs);

  if (auth === null) return;

  return (
    <div>
      <Menu user={auth.user} />
      <Notification />

      <Routes>
        <Route path="/blogs" element={<BlogList blogs={blogs} />} />
        <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
