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

// Sends a POST request to the server with the user data and stores the user data in the local storage
export const register = async registerData => {
    const { data } = await axios.post('/api/users/register', registerData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}

// Sends a PUT request to the server with the user data and stores the user data in the local storage
export const updateProfile = async user => {
    const { data } = await axios.put('/api/users/updateProfile', user);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}

// Sends a PUT request to the server with the password data 
export const changePassword = async passwords => {
    await axios.put('/api/users/changePassword', passwords);
};

// Removes the user data from the local storage
export const logout = () => {
    localStorage.removeItem('user');
}
