import { useCallback } from "react";

// Other custom hooks
import useToasts from "../../hooks/useToasts";

// Custom hook for the browsing toasts component
function useBrowsingToasts() {
  const { browsingMessages, handleToastHide, handleToastDelete } = useToasts();

  const handleHide = useCallback(
    (message) => {
      handleToastHide({ type: "BROWSING_MESSAGE", message });
    },
    [handleToastHide]
  );

  const handleDelete = useCallback(
    (message) => {
      handleToastDelete({ type: "BROWSING_MESSAGE", message });
    },
    [handleToastDelete]
  );

  return { browsingMessages, handleHide, handleDelete };
}

export default useBrowsingToasts;
