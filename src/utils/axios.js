import axios from "axios";

const instance = axios.create({
    baseURL: 'https://abychkov-auth-server.herokuapp.com'
});

instance.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('auth') ? localStorage.getItem('auth') : '';
    return config;
});

export default instance;

