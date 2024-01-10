import axios from "axios";

const instance = axios.create({
    baseURL: 'http://5.35.82.91:4444'
});

instance.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('auth') ? localStorage.getItem('auth') : '';
    return config;
});

export default instance;

