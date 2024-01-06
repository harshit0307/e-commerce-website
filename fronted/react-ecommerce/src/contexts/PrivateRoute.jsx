import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "../contexts/AuthProvider"

const PrivateRoute = ({children}) => {

    const { authenticated, loading } = useAuth();
    const location = useLocation()

    if(loading){
        <div>Loading...</div>
    }

    if(authenticated){
        return children
    }


    return (
        <Navigate to="/login" state={{from: location}} replace/>
    );
};

export default PrivateRoute;