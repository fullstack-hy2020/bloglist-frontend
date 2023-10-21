import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import blogsService from "./services/blogsService";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import { setNotification } from "../shared/reducers/notificationReducer";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [render, setRender] = useState(true);

  const dispatch = useDispatch();

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

  const createBlog = async (blog) => await blogsService.create(blog);

  return (
    <div>
      <BlogForm
        setBlogs={setBlogs}
        existingBlogs={blogs}
        createBlog={createBlog}
      />
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
