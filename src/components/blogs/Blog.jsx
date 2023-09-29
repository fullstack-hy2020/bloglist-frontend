import { useEffect, useState } from 'react'

const Blog = ({ username, blog, deleteBlog, likeBlog }) => {
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
    blog.likes++
    await likeBlog(blog)
    setLikes(blog.likes)
  }

  useEffect(() => {
    let content = ''

    if(detailedView){
      content =
        <div style={blogStyle} className={`${className}-detailed`}>
          <div>
            {blog.title} {blog.author} <button id={'hide-blog-button'} onClick={toggleDetails}>hide</button>
          </div>
          <div className={`${className}-url`}>
            {blog.url}
          </div>
          <div id={`${className}-likes`} className={`${className}-likes`}>
            {likes}
          </div>
          <button id='like-button' onClick={like(blog)}>like</button>
          <div className={`${className}-user`}>
            {blog.user.name}
          </div>
          { blog.user.username === username &&
            <button id='remove-button' onClick={deleteBlog(blog)}>remove</button>
          }
        </div>
    }else{
      content =
        <div style={blogStyle} className={className}>
          {blog.title} {blog.author} <button id='view-button' onClick={toggleDetails}>view</button>
        </div>
    }

    setContent(content)
  }, [detailedView, likes])

  return content
}

export default Blog
