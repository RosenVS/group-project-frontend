import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function RequireAuth(Component) {
    return function AuthenticatedComponent(props) {
        const { authState } = useAuth();
        const location = useLocation();
        console.log(Component, authState)
        return (
            authState
                ? 
                <Component {...props} />
                : <Component {...props} />
        );
    };
}