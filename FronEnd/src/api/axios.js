import api from "../api/axios";

const api = api.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
