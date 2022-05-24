import { useContext } from "react";

// Toasts context
import toastsContext from "../contexts/toasts-context";

// Custom hook for wrapping the access to the toasts context
function useToasts() {
  return useContext(toastsContext);
}

export default useToasts;
