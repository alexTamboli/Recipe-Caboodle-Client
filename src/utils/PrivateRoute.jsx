import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default PrivateRoute;
