import { useEffect, useState } from 'react'
import blogsService from '../../services/blogs'

const Blog = ({ blog, deleteBlog }) => {
  const [detailedView, setDetailedView] = useState(false)
  const [content, setContent] = useState('')
  const [likes, setLikes] = useState(blog.likes)

  const className = 'blog'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setDetailedView(!detailedView)
  }

  const like = blog => async () => {
    await blogsService.update(blog.id, { likes: ++blog.likes })
    setLikes(blog.likes)
  }

  useEffect(() => {
    let content = ''

    if(detailedView){
      content =
        <div style={blogStyle} className={`detailed-${className}`}>
          <div>
            {blog.title} {blog.author} <button onClick={toggleDetails}>hide</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            {likes} <button onClick={like(blog)}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          <button onClick={deleteBlog(blog)}>remove</button>
        </div>
    }else{
      content =
        <div style={blogStyle} className={className}>
          {blog.title} {blog.author} <button onClick={toggleDetails}>view</button>
        </div>
    }

    setContent(content)
  }, [detailedView, likes])

  return content
}

export default Blog
