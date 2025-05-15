import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('authToken'); // Example: Check for an auth token

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    
    return <Outlet />;
};

export default ProtectedRoute;