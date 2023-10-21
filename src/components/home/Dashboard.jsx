import { useDispatch, useSelector } from "react-redux";
import BlogList from "../blogs/BlogList";
import { logout } from "../auth/reducers/authReducer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  if (auth === null) return;

  return (
    <div>
      <h2>Blogs Dashboard</h2>
      <div>
        {auth.user.name} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </div>
      <BlogList />
    </div>
  );
};

export default Dashboard;
