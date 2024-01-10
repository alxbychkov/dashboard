import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://habr.atcon.ru/api/v2/auth/' : 'http://5.35.82.91:4444'
});

instance.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('auth') ? localStorage.getItem('auth') : '';
    return config;
});

export default instance;

