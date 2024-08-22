const BlogForm = ({
  addBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange,
}) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        <div>Title: <input value={newTitle} onChange={handleTitleChange} /></div>
        <div>Author: <input value={newAuthor} onChange={handleAuthorChange} /></div>
        <div>Url: <input value={newUrl} onChange={handleUrlChange} /></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default BlogForm;
