import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";
import { getAll } from "./reducers/blogsReducer";

const BlogList = ({ blogs }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const style = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <h2>blogs</h2>
      <BlogForm />
      <h3>Saved Blogs</h3>
      {blogs.map((blog) => (
        <div style={style}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
