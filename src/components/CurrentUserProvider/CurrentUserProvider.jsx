import { useState, useEffect, useMemo, useCallback } from "react";

// The current user context
import currentUserContext from "../../contexts/currentUser-context";

// API calls
import { authenticateUserFromToken } from "../../apis/users-api";

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initialSetupIsDone, setInitialSetupState] = useState(false);

  // Whether the current user is logged in or not
  const isLoggedIn = useMemo(() => initialSetupIsDone && currentUser !== null, [initialSetupIsDone, currentUser]);

  // Logs out the current user
  const logout = useCallback((callback) => {
    // Clearing the tokens
    localStorage.removeItem("access-token");
    setCurrentUser(null);
    setInitialSetupState(true);
    if (callback) callback();
  }, []);

  const contextValue = useMemo(
    () => ({
      currentUser,
      initialSetupIsDone,
      isLoggedIn,
      setCurrentUser,
      logout,
    }),
    [currentUser, initialSetupIsDone, isLoggedIn, logout]
  );

  /* Attempting to authenticate the user from the eventual access token stored in local storage */
  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      authenticateUserFromToken()
        .then((user) => {
          setCurrentUser(user);
          setInitialSetupState(true);
        })
        .catch((error) => {
          console.log(error);
          logout();
        });
    } else setInitialSetupState(true);
  }, [logout]);

  return <currentUserContext.Provider value={contextValue}>{children}</currentUserContext.Provider>;
};

export default CurrentUserProvider;
