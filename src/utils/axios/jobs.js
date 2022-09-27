import axios from "axios";

const instance = axios.create({
    baseURL: 'http://185.156.179.156:4000/'
});

export default instance;