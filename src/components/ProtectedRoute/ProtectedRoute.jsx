import { Navigate, useLocation } from "react-router-dom";

// Current user custom hook
import useCurrentUser from "../../hooks/useCurrentUser";

const ProtectedRoute = ({ reverse = false, children }) => {
  const { isLoggedIn } = useCurrentUser();

  const { pathname, search } = useLocation();

  const location = `${pathname}${search}`;

  if (reverse && isLoggedIn) return <Navigate to="/" replace />;
  else if (!reverse && !isLoggedIn) return <Navigate to="/auth/login" replace state={{ from: location }} />;

  return children;
};

export default ProtectedRoute;
