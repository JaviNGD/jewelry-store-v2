import axios from "axios";

axios.interceptors.request.use(config => {
    const user = localStorage.getItem('user');
    const token = user && JSON.parse(user).token;

    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
