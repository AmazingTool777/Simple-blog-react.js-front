import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Other custom hook
import useCurrentUser from "../../hooks/useCurrentUser";
import useToasts from "../../hooks/useToasts";

const ProtectedRoute = ({ reverse = false, children }) => {
  const { isLoggedIn } = useCurrentUser();

  const { pathname, search } = useLocation();

  const { handleToastAdd } = useToasts();

  useEffect(
    () => () => {
      if (reverse && isLoggedIn) {
        handleToastAdd({
          type: "BROWSING_MESSAGE",
          message: {
            title: (
              <>
                <FontAwesomeIcon icon="times-circle" className="me-2 text-danger" />
                Authorization error
              </>
            ),
            content: <p className="text-danger mb-0">You must be signed out to access this page</p>,
          },
        });
      } else if (!reverse && !isLoggedIn) {
        handleToastAdd({
          type: "BROWSING_MESSAGE",
          message: {
            title: (
              <>
                <FontAwesomeIcon icon="times-circle" className="me-2 text-danger" />
                Authorization error
              </>
            ),
            content: <p className="text-danger mb-0">You must sign in to access this page</p>,
          },
        });
      }
    },
    [handleToastAdd, isLoggedIn, reverse]
  );

  if (reverse && isLoggedIn) return <Navigate to="/" replace />;
  else if (!reverse && !isLoggedIn) {
    const location = `${pathname}${search}`;
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
