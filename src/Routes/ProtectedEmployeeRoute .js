import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedEmployeeRoute = ({ element }) => {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

  // Check if the user is authenticated and has the employee role
  if (!isAuthenticated || currentUser?.role !== "employee") {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedEmployeeRoute;
