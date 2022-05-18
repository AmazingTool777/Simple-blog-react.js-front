import { createContext } from "react";

// Context for the current user data
const currentUserContext = createContext({
	currentUser: {},
	initialSetupIsDone: false,
	isLoggedIn: false,
	setCurrentUser: () => {},
	logout: () => {},
});

export default currentUserContext;
