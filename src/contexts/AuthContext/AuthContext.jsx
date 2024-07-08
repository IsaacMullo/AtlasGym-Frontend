import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loginError, setLoginError] = useState(false);

    const login = async (credentials) => {
        setLoginError(false);
        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (response.ok) {
            setUser(data);
            return true;
        } else {
            setLoginError(true);
            alert(data.message || 'Credenciales no válidas');
            return false; 
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, loginError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
