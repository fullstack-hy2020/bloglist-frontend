import { useRef } from "react";
import { useDispatch } from "react-redux";
import Togglable from "../shared/Togglable";
import { setNotification } from "../shared/reducers/notificationReducer";
import { create } from "./reducers/blogsReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const newBlogRef = useRef();

  const createBlog = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    const newBlog = {
      title,
      author,
      url,
    };

    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";

    dispatch(create(newBlog))
      .then(() => {
        dispatch(
          setNotification({
            message: "Blog created successfully",
            type: "success",
          })
        );
        newBlogRef.current.toggleVisibility();
      })
      .catch((error) =>
        dispatch(
          setNotification({
            message: error,
            type: "error",
          })
        )
      );
  };

  return (
    <div>
      <Togglable buttonId="new-blog" buttonLabel={"New Blog"} ref={newBlogRef}>
        <h3>New Blog</h3>
        <form onSubmit={createBlog}>
          <div>
            <label htmlFor="title-input">Title:</label>
            <input id="title-input" type="text" name="title" />
          </div>
          <div>
            <label htmlFor="author-input">Author:</label>
            <input id="author-input" type="text" name="author" />
          </div>
          <div>
            <label htmlFor="url-input">Url:</label>
            <input id="url-input" type="url" name="url" />
          </div>
          <button id="create-button" type="submit">
            create
          </button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
