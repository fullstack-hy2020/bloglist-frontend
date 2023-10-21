import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import { setNotification } from "../shared/reducers/notificationReducer";
import { remove, like, getAll } from "./reducers/blogsReducer";

const BlogList = () => {
  const [username, setUsername] = useState("");

  const blogs = useSelector((state) => _.orderBy(state.blogs, "likes", "desc"));
  const dispatch = useDispatch();

  useEffect(() => {
    const { username } = JSON.parse(window.localStorage.getItem("user"));
    setUsername(username);

    dispatch(getAll());
  }, []);

  const deleteBlog = (blog) => () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      let type = "success";
      let message = "Blog deleted successfully";

      try {
        dispatch(remove(blog));
      } catch {
        type = "error";
        message = "Failed to delete blog";
      } finally {
        dispatch(
          setNotification({
            message,
            type,
          })
        );
      }
    }
  };

  const likeBlog = (blog) => () => dispatch(like(blog));

  return (
    <div>
      <BlogForm />
      <h3>Saved Blogs</h3>
      <div>
        {blogs.map((blog) => (
          <Blog
            username={username}
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
