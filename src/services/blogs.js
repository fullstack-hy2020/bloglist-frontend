import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl, headers())
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, headers())
  return response.data
}

const update = async (id, data) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, data, headers())
  return response.data
}

const del = async (id) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, headers())
  return response.data
}

const headers = () => {
  const { token } =  JSON.parse(window.localStorage.getItem('user'))
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export default { 
  getAll,
  create,
  update,
  del 
}
