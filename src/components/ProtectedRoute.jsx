import { Navigate } from "react-router-dom";
import { isTokenValid, getRole, getHomePathForRole } from "../hooks/useAuth";

export default function ProtectedRoute({ children, allow }) {
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }
  if (allow && allow.length > 0) {
    const role = getRole();
    const permitted = allow.map((r) => r.toUpperCase());
    if (role && !permitted.includes(role)) {
      return <Navigate to={getHomePathForRole(role)} replace />;
    }
  }

  return children;
}
