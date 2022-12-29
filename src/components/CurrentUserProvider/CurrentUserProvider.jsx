import { useState, useEffect, useMemo, useCallback, useRef } from "react";

// Other contexts
import { useSocket } from "../../contexts/socket";

// The current user context
import currentUserContext from "../../contexts/currentUser-context";

// API calls
import { authenticateUserFromToken } from "../../apis/users-api";

const CurrentUserProvider = ({ children }) => {
  const { connectSocket } = useSocket();

  const countRef = useRef(0);

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

  useEffect(() => {
    setupAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Attempts to authenticate the user from the eventual access token stored in local storage
   */
  async function setupAuthentication() {
    const token = localStorage.getItem("access-token");
    let user;
    if (token) {
      try {
        user = await authenticateUserFromToken();
        setCurrentUser(user);
      } catch (error) {
        console.log(error);
        logout();
      }
    }
    setInitialSetupState(true);
    countRef.current === 0 && connectSocket();
    countRef.current++;
  }

  return <currentUserContext.Provider value={contextValue}>{children}</currentUserContext.Provider>;
};

export default CurrentUserProvider;
