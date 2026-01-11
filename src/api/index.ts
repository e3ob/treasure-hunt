import axios from 'axios';

const ApiHandler = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://gorssbot-f8eaffe29a8e.herokuapp.com/',
})
export default ApiHandler;