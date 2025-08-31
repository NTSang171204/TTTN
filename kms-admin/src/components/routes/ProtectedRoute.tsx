import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "@/data/AdminContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAdmin();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
