import {useState} from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children, isAuth,redirectPath}) => {
    
    if (!isAuth) {
        console.log("Inicie sesion Primero")
        return children;
    } else {
        return <Navigate to={redirectPath} />;
    }
}

export default PrivateRoute
