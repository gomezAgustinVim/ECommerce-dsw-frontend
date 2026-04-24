import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // true para que envie el refresh token en el cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// token para usar automaticamente
api.interceptors.request.use((config) => {
  // interceptors es basicamente como un middleware
  // modifica peticiones y respuestas HTTP
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Track whether a refresh is already in progress to avoid parallel refresh calls
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void; // recibe token string y no devuelve nada
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!); // cuando llamamos acá se espera un string
      // no string | null en este punto solo se puede ser string
      // porque el resolve significa que hubo token
    }
  });
  failedQueue = [];
};

// redirige al login cuando el token expira
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // peticion para intentar reloguear al usuario
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // const { data } = await api.post("/auth/refresh", {
        //   refreshToken: localStorage.getItem("refresh_token"),
        // });

        const { data } = await api.post("/auth/refresh");
        const newToken = data.token;
        localStorage.setItem("token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken); // en este punto tenemos un token, no hay error
        return api(originalRequest); // reintenta el request original
      } catch (refreshError) {
        processQueue(refreshError, null); // acá si hay error
        // refresh también falló, mandamos al login
        localStorage.removeItem("token");
        localStorage.removeItem("clienteId");
        localStorage.removeItem("rol");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;

//sacase dr .env
