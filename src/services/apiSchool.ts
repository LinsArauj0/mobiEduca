import axios from "axios";

const api = axios.create({
    baseURL: 'https://apiteste.mobieduca.me/',
    timeout: 10000,
    headers: {
        'Content-Length' : 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {

            // window.location.href = '/login';
            console.log("Não tem")
        }
        return Promise.reject(error);
    }
)

export default api;