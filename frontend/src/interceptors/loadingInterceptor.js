import axios from "axios";

// This interceptor will show and hide the loading spinner
export const setLoadingInterceptor = ({ showLoading, hideLoading}) => {
    // If there is a request, show the loading spinner
    axios.interceptors.request.use((req) => {
        showLoading();
        return req;
    },
    // If there is an error, hide the loading spinner and return the error, so the loading spinner doesn't stay on the screen
    error => {
        hideLoading();
        return Promise.reject(error);
    })

    // If there is a response, hide the loading spinner
    axios.interceptors.response.use(res => {
        hideLoading();
        return res;
    },
    error => {
        hideLoading();
        return Promise.reject(error);
    })
}

export default setLoadingInterceptor;