import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import { remove, like, getAll } from "./reducers/blogsReducer";
import {
  useNotificationDispatch,
  showNotification,
} from "../shared/contexts/NotificationContext";

const BlogList = () => {
  const blogs = useSelector((state) => _.orderBy(state.blogs, "likes", "desc"));
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, []);

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
    }
  };

  const likeBlog = (blog) => () => dispatch(like(blog));

  return (
    <div>
      <h2>blogs</h2>
      <BlogForm />
      <h3>Saved Blogs</h3>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={deleteBlog}
            likeBlog={likeBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
