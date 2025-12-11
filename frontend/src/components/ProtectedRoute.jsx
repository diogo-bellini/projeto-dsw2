import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    alert("Você precisa estar logado para acessar esta página!");
    return <Navigate to="/login" replace />;
  }

  return children;
}
