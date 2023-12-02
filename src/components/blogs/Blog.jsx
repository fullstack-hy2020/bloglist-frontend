import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useNotificationDispatch,
  showNotification,
} from "../shared/contexts/NotificationContext";
import { remove, like } from "./reducers/blogsReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const notificationDispatch = useNotificationDispatch();

  const className = "blog";

  const deleteBlog = (blog) => () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(remove(blog))
        .then(() => {
          showNotification(notificationDispatch, {
            message: "Blog deleted successfully.",
            type: "success",
          });
        })
        .catch((error) => {
          showNotification(notificationDispatch, {
            message: error,
            type: "error",
          });
        });
      navigate("/blogs");
    }
  };

  const likeBlog = (blog) => () => dispatch(like(blog));

  return (
    <div className={`${className}`}>
      <h3>{blog.title}</h3>
      <div className={`${className}-url`}>{blog.url}</div>
      <div id={`${className}-likes`} className={`${className}-likes`}>
        {blog.likes} likes
      </div>
      <button id="like-button" onClick={likeBlog(blog)}>
        like
      </button>
      <div>added by {blog.author}</div>
      {blog.user.username === auth.user.username && (
        <button id="remove-button" onClick={deleteBlog(blog)}>
          remove
        </button>
      )}
    </div>
  );
};

export default Blog;
