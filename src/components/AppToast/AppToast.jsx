import { useEffect, useCallback, useRef } from "react";
import Toast from "react-bootstrap/Toast";

// Custom hooks
import useCheckIfUpdated from "../../hooks/useCheckIfUpdated";

const AppToast = ({
  show = true,
  duration = 5000,
  delay = 5000,
  toast,
  className = "",
  onClose = () => {},
  onDelete = () => {},
}) => {
  const handleCloseRef = useRef(null);
  const handleDeleteRef = useRef(null);

  const handleClose = useCallback(() => {
    onClose(toast);
  }, [onClose, toast]);
  handleCloseRef.current = handleClose;

  const handleDelete = useCallback(() => {
    onDelete(toast);
  }, [onDelete, toast]);
  handleDeleteRef.current = handleDelete;

  useEffect(() => {
    setTimeout(handleCloseRef.current, duration);
    return () => clearTimeout(handleCloseRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isUpdated = useCheckIfUpdated();

  useEffect(() => {
    if (isUpdated && !show) {
      setTimeout(handleDeleteRef.current, delay);
      return () => clearTimeout(handleDeleteRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated, show]);

  return (
    <Toast show={show} animation={true} delay={delay} onClose={handleClose} className={className}>
      <Toast.Header>{toast.title}</Toast.Header>
      <Toast.Body>{toast.content}</Toast.Body>
    </Toast>
  );
};

export default AppToast;
