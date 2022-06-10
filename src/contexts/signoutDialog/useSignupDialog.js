import { useContext } from "react";

// The context
import signoutDialogContext from "./signoutDialog-context";

// Custom hook for wrapping the access of the signout dialog context
export default function useSignoutDialog() {
  return useContext(signoutDialogContext);
}
