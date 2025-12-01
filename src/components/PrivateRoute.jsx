import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../utils/auth"; // must exist in your project
 
export default function PrivateRoute({ children }) {
  const user = getUser();
  const location = useLocation();
 
  if (!user) {
    // Redirect to /login and preserve the original location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
 
  return children;
}