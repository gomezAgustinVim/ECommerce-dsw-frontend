import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: false, // por ahora en false para que no envie cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// token para usar automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// redirige al login cuando el token expira
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("clienteId");
      localStorage.removeItem("rol");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;

//sacase dr .env

