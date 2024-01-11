import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://habr.atcon.ru/api/v2/auth/' : 'http://185.156.179.156:4444/auth/'
});

instance.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('auth') ? localStorage.getItem('auth') : '';
    return config;
});

export default instance;

