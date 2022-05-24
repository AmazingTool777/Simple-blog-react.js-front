import { useCallback } from "react";

// Other custom hooks
import useToasts from "../../hooks/useToasts";

// Custom hook for the operations toasts component
function useOperationsToasts() {
  const { opsMessages, handleToastHide, handleToastDelete } = useToasts();

  const handleHide = useCallback(
    (message) => {
      handleToastHide({ type: "OPERATION_MESSAGE", message });
    },
    [handleToastHide]
  );

  const handleDelete = useCallback(
    (message) => {
      handleToastDelete({ type: "OPERATION_MESSAGE", message });
    },
    [handleToastDelete]
  );

  return { opsMessages, handleHide, handleDelete };
}

export default useOperationsToasts;
