import axios from "axios";

const instance = axios.create({
    baseURL:  process.env.NODE_ENV === 'production' ? 'https://habr.atcon.ru/api/v2/scarper/' : 'http://185.156.179.156:3000/'
});

export default instance;