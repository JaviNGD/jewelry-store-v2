import axios from 'axios';

// Returns the user data from the local storage
export const getUser = () => 
    localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

// Sends a POST request to the server with the email and password and stores the user data in the local storage
export const login = async (email, password) => {
    const { data } = await axios.post('/api/users/login', { email, password });
    localStorage.setItem('user', JSON.stringify(data));
    return data;
};

// Removes the user data from the local storage
export const logout = () => {
    localStorage.removeItem('user');
}
