import { useContext } from "react";

// The current user context
import currentUserContext from "../contexts/currentUser-context";

// Custom hook for accessing the current user context values
function useCurrentUser() {
	return useContext(currentUserContext);
}

export default useCurrentUser;
