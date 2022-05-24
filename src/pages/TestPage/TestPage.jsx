import { useState, useEffect, useCallback, useRef } from "react";

// Custom hooks
import useToasts from "../../hooks/useToasts";

// Components
import NotificationsToasts from "../../components/NotificationsToasts";

// Styles
import "./TestPage.css";

const TestPage = () => {
  const [count, setCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);

  const incrementCountRef = useRef(null);

  const { handleToastAdd } = useToasts();

  const handleAdd = useCallback(() => {
    handleToastAdd({
      type: "NOTIFICATION",
      message: { title: "Notification message", content: "You received 2 new messages" },
    });
  }, [handleToastAdd]);

  const incrementCount = useCallback(() => setCount(count + 1), [count]);
  incrementCountRef.current = incrementCount;

  const LIMIT = 5;

  useEffect(() => {
    if (count >= 1) {
      handleAdd();
      setDoneCount(doneCount + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    if (count < LIMIT) {
      setTimeout(incrementCountRef.current, 5000);
      return () => clearTimeout(incrementCountRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneCount]);

  /* useEffect(() => {
    if (count < LIMIT) {
      setTimeout(incrementCount, 5000);
      return () => clearTimeout(incrementCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toasts]);

  useEffect(() => {
    if (count >= 1) addToast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]); */

  return (
    <div id="test-page">
      <NotificationsToasts />
    </div>
  );
};

export default TestPage;
