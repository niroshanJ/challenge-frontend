import axios from 'axios';

export const userAddAPI = (userData) => {
    return axios.post('user', userData);
}