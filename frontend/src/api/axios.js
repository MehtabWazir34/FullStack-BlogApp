// import api from "../api/axios";
import axios from 'axios'
const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosAPI;
