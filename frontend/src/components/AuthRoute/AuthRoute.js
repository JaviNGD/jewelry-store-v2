import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// AuthRoute.js is a component that will be used to protect routes that require authentication. 
// If the user is authenticated, it renders the children prop, otherwise it redirects the user to the login page.
export default function AuthRoute({children}) {
    const { user } = useAuth();
    const location = useLocation();

    return user ? (
        children
    ) : (
        <Navigate to={`/login?returnUrl=${location.pathname}`} replace/>
    )
}
