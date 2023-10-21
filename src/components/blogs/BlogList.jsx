import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import blogsService from "./services/blogsService";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import { setNotification } from "../shared/reducers/notificationReducer";
import { remove } from "./reducers/blogsReducer";

const BlogList = () => {
  const [username, setUsername] = useState("");
  const [render, setRender] = useState(true);

  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    const { username } = JSON.parse(window.localStorage.getItem("user"));
    setUsername(username);
  }, [render]);

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

  const likeBlog = async (blog) => {
    await blogsService.update(blog.id, { likes: blog.likes });
    setRender(!render);
  };

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
