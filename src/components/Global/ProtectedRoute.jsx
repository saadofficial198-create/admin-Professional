// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or sessionStorage if you prefer

  if (!token) {
    // No token → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // Token exists → allow access
};

export default ProtectedRoute;
