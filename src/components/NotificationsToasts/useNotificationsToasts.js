import { useCallback } from "react";

// Other custom hooks
import useToasts from "../../hooks/useToasts";

// Custom hook for the notifications toasts component
function useNotificationsToasts() {
  const { notifications, handleToastHide, handleToastDelete } = useToasts();

  const handleHide = useCallback(
    (message) => {
      handleToastHide({ type: "NOTIFICATION", message });
    },
    [handleToastHide]
  );

  const handleDelete = useCallback(
    (message) => {
      handleToastDelete({ type: "NOTIFICATION", message });
    },
    [handleToastDelete]
  );

  return { notifications, handleHide, handleDelete };
}

export default useNotificationsToasts;
