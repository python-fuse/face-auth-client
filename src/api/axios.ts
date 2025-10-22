import axios from "axios";

const api = axios.create({
  baseURL: "https://face-auth-server-r6hw.onrender.com/api/",
  withCredentials: true,
});

export default api;
