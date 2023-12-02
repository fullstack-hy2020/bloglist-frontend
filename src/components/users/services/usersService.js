import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl, headers());
  return response.data;
};

const headers = () => {
  const { token } = JSON.parse(window.localStorage.getItem("user"));
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default {
  getAll,
};
