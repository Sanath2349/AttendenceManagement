import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ element }) => {
    const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  
    // Check if the user is authenticated and has the admin role
    if (!isAuthenticated || currentUser?.role !== "admin") {
      return <Navigate to="/login" replace />;
    }
  
    return element;
  };

  export default ProtectedAdminRoute;
  