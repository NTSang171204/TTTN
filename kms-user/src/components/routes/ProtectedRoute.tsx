import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: ReactNode; 
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  // Nếu có children thì render children
  if (children) {
    return token ? <>{children}</> : <Navigate to="/login" replace />;
  }

  // Nếu không có children (nested) thì render Outlet
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
