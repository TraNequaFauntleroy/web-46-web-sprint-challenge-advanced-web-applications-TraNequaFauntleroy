import axios from 'axios';

export const axiosWithAuth =() => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'http://localhost:5000/api',
        // If token is present add Authorization header to the request
        ...(token && {headers: {
            Authorization: token,
        }})
    });
};
//Task List:
//Build and export a function used to send in our authorization token