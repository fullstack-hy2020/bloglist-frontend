import { useEffect, useState } from "react";

const Blog = ({ username, blog, deleteBlog, likeBlog }) => {
  const [detailedView, setDetailedView] = useState(false);
  const [content, setContent] = useState("");

  const className = "blog";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = () => {
    setDetailedView(!detailedView);
  };

  useEffect(() => {
    let content = "";

    if (detailedView) {
      content = (
        <div style={blogStyle} className={`${className}-detailed`}>
          <div>
            {blog.title} {blog.author}{" "}
            <button id={"hide-blog-button"} onClick={toggleDetails}>
              hide
            </button>
          </div>
          <div className={`${className}-url`}>{blog.url}</div>
          <div id={`${className}-likes`} className={`${className}-likes`}>
            {blog.likes}
          </div>
          <button id="like-button" onClick={likeBlog(blog)}>
            like
          </button>
          <div className={`${className}-user`}>{blog.user.name}</div>
          {blog.user.username === username && (
            <button id="remove-button" onClick={deleteBlog(blog)}>
              remove
            </button>
          )}
        </div>
      );
    } else {
      content = (
        <div style={blogStyle} className={className}>
          {blog.title} {blog.author}{" "}
          <button id="view-button" onClick={toggleDetails}>
            view
          </button>
        </div>
      );
    }

    setContent(content);
  }, [blog, detailedView]);

  return content;
};

export default Blog;
