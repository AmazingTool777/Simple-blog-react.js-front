import { createContext } from "react";

// Context for the toasts data
const toastsContext = createContext({
  notifications: [],
  browsingMessages: [],
  opsMessages: [],
  handleToastAdd: () => {},
  handleToastHide: () => {},
  handleToastDelete: () => {},
});

export default toastsContext;
