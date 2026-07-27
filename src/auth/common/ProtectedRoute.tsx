import { Navigate, Outlet } from "react-router-dom";
import { getAuthSession } from "../../utils/authStorage";
import type { SignInUser } from "../types/auth.types";

interface ProtectedRouteProps {
  role?: string;
}

// Route guard for pages that require a logged-in session (and optionally a
// specific role). Backend still enforces this on every request — this just
// stops an unauthenticated visit from ever rendering the protected UI.
const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const session = getAuthSession<SignInUser>();

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  if (role && session.user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
