import { useState, useCallback, useMemo } from "react";

// The context
import signoutDialogContext from "./signoutDialog-context";

const SignoutDialogProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleSignoutModalShow = useCallback((show) => {
    setShow(show);
  }, []);

  const contextValues = useMemo(
    () => ({
      signoutDialogShow: show,
      handleSignoutModalShow,
    }),
    [handleSignoutModalShow, show]
  );

  return <signoutDialogContext.Provider value={contextValues}>{children}</signoutDialogContext.Provider>;
};

export default SignoutDialogProvider;
