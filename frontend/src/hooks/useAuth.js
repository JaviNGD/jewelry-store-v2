import { useState, createContext, useContext } from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(userService.getUser());
    
    const login = async (email, password) => {
        try {
            const data = await userService.login(email, password);
            setUser(data);
            toast.success("You have successfully logged in!");
        } catch (err) {
            toast.error(err.response.data);
        }
    };
    
    const logout = () => {
        userService.logout();
        setUser(null);
        toast.success("You have successfully logged out!");
    };
    
    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};  

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
