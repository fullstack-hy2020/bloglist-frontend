import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (pureToken) =>
{
  token = `Bearer ${pureToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) =>
{
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: token } })
  return response.data
}

const updateBlog = async (blogId, blogData) =>
{
  const response = await axios.put(`${baseUrl}/${blogId}`, blogData, { headers: { Authorization: token } })
  return response.data
}

const deleteBlog = async (blogId) =>
{
  const response = await axios.delete(`${baseUrl}/${blogId}`, { headers: { Authorization: token } })
  return response.data
}

export default { getAll, createBlog, updateBlog, deleteBlog, setToken }