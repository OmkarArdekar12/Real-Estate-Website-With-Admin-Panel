import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import FullScreenLoader from "../components/common/FullScreenLoader";

const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
