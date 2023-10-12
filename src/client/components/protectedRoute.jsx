import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  if (!isAdmin || isAdmin == "false") {
    return <Navigate to="/products" replace />;
  }

  return children;
};

export default ProtectedRoute;
