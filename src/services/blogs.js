import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async token => {
  const response = await axios.get(baseUrl, headers(token))
  return response.data
}

const headers = (token) => {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

export default { getAll }