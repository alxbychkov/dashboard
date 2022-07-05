import axios from "axios";

const instance = axios.create({
    baseURL: 'https://abychkov-auth-server.herokuapp.com'
});

instance.interceptors.request.use(config => {
    config.headers.AccessControlAllowOrigin = 'http://localhost:3000';
    config.headers.AccessControlAllowCredentials = true;
    config.headers.AccessControlAllowMethods = "GET, OPTIONS, POST, PUT"; 
    config.headers.Authorization = localStorage.getItem('auth') ? localStorage.getItem('auth') : '';
    return config;
});

export default instance;

