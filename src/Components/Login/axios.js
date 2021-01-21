import axios from 'axios';

const instance = axios.create({
    baseURL : 'link'
});

export default instance;