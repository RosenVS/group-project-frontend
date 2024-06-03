import {createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);

    useEffect(() => {
        // Try to load the auth data from the session storage on startup
        const storedAuthData = sessionStorage.getItem('authData');
        if (storedAuthData) {
            setAuthState(JSON.parse(storedAuthData));
        }
    }, []); // Add an empty dependency array here

    const setAuth = (authData) => {
        // Save the auth data in the state and the session storage
        setAuthState(authData);
        sessionStorage.setItem('authData', JSON.stringify(authData));
    };

    return (
        <AuthContext.Provider value={{ authState, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    // If authState is null, try to load the auth data from the session storage
    if (context.authState === null) {
        const storedAuthData = sessionStorage.getItem('authData');
        if (storedAuthData) {
            try {
                // Parse the stored auth data and return it
                const parsedData = JSON.parse(storedAuthData);
                return { ...context, authState: parsedData };
            } catch (error) {
                console.error('Error parsing stored auth data:', error);
            }
        }
    }

    return context;
};