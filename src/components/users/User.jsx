const User = ({ user }) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <text>added blogs</text>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
