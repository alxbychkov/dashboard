import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://185.156.179.156:4000/'
    baseURL: 'https://habr.atcon.ru/api/v2/cryptojobslist/'
});

export default instance;