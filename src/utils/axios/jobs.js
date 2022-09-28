import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://habr.atcon.ru/api/v2/cryptojobslist/' : 'http://185.156.179.156:4000/'
});

export default instance;