import { useState, useEffect, useCallback } from "react";
import AppToast from "../../components/AppToast";

// Styles
import "./TestPage.css";

const TestPage = () => {
  const [toasts, setToasts] = useState([
    // { id: Date.now(), title: "Notification", content: "You have a new message", duration: 2000, show: true },
    // { id: Date.now() + 2, title: "Notification", content: "You have a new message", duration: 2000, show: true },
  ]);
  const [count, setCount] = useState(0);

  const handleClose = useCallback(
    (toast) => {
      const i = toasts.indexOf(toast);
      const _toasts = [...toasts];
      _toasts[i] = { ...toast, show: false };
      setToasts(() => _toasts);
    },
    [toasts]
  );

  const handleDelete = useCallback(
    (toast) => {
      setToasts(toasts.filter((_toast) => _toast !== toast));
    },
    [toasts]
  );

  const LIMIT = 5;

  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const addToast = useCallback(() => {
    setToasts([
      ...toasts,
      { id: Date.now(), title: "Notification", content: "You have a new message", duration: 2000, show: true },
    ]);
  }, [toasts]);

  useEffect(() => {
    if (count < LIMIT) {
      setTimeout(incrementCount, 5000);
      return () => clearTimeout(incrementCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toasts]);

  useEffect(() => {
    if (count >= 1) addToast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div id="test-page">
      <div className="toasts-container">
        <div className="toasts-wrapper d-flex flex-column">
          {toasts.map((toast) => (
            <AppToast
              key={toast.id}
              show={toast.show}
              duration={toast.duration}
              toast={toast}
              onClose={handleClose}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
