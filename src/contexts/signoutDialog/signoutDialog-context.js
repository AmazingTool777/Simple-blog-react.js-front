import { createContext } from "react";

// Signout modal context
const signoutDialogContext = createContext({
  signoutDialogShow: false,
  handleSignoutModalShow: () => {},
});

export default signoutDialogContext;
