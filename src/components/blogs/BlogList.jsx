import { useEffect, useState } from "react";
import _ from "lodash";
import helpers from "../../utils/helpers";
import blogsService from "../../services/blogs";
import Notification from "../shared/Notification";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [render, setRender] = useState(true);

  useEffect(() => {
    const { username } = JSON.parse(window.localStorage.getItem("user"));
    setUsername(username);

    blogsService
      .getAll()
      .then((blogs) => setBlogs(_.orderBy(blogs, "likes", "desc")));
  }, [render]);

  const deleteBlog = (blog) => async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const id = blog.id;
      let type = "success";
      let message = "Blog deleted successfully";

      try {
        await blogsService.del(id);
        const newBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(newBlogs);
      } catch {
        type = "error";
        message = "Failed to delete blog";
      } finally {
        helpers.setStateTimeout(
          <Notification type={type} message={message} />,
          setNotification,
          3000,
        );
      }
    }
  };

  const likeBlog = async (blog) => {
    await blogsService.update(blog.id, { likes: blog.likes });
    setRender(!render);
  };

  const createBlog = async (blog) => await blogsService.create(blog);

  return (
    <div>
      <BlogForm
        setBlogs={setBlogs}
        existingBlogs={blogs}
        createBlog={createBlog}
      />
      <h3>Saved Blogs</h3>
      <div>{notification}</div>
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
