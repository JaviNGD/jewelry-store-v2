import { useState, createContext, useContext } from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(userService.getUser());
    const navigate = useNavigate();
    
    const login = async (email, password) => {
        try {
            const data = await userService.login(email, password);
            setUser(data);
            toast.success("You have successfully logged in!");
        } catch (err) {
            toast.error(err.response.data);
        }
    };

    const register = async (registerData) => {
        try {
            const user = await userService.register(registerData);
            setUser(user);
            toast.success("You have successfully registered!");
        } catch (err) {
            toast.error(err.response.data);
        }
    };
    
    const logout = () => {
        userService.logout();
        setUser(null);
        toast.success("You have successfully logged out!");
    };

    const updateProfile = async (user) => {
        try {
            const updatedUser = await userService.updateProfile(user);
            setUser(updatedUser);
            toast.success("You have successfully updated your profile!");
        } catch (err) {
            toast.error(err.response.data);
        }
    };

    const changePassword = async passwords => {
        try {
            await userService.changePassword(passwords);
            logout();
            toast.success('Password Changed Successfully, Please Login Again!');
            navigate('/login');
        } catch (err) {
            toast.error(err.response.data);
        }
    };
    
    return <AuthContext.Provider value={{ user, login, register, logout, updateProfile, changePassword }}>{children}</AuthContext.Provider>;
};  

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
