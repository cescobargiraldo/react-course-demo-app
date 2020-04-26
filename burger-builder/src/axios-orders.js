import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-34354.firebaseio.com/'
});

export default instance;