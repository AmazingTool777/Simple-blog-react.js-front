import { useState, useEffect, useCallback, useRef } from "react";

// Custom hooks
import useToasts from "../../hooks/useToasts";

// Components
import BrowsingToasts from "../../components/BrowsingToasts";

// Styles
import "./TestPage.css";

const TestPage = () => {
  const [count, setCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);

  const incrementCountRef = useRef(null);

  const { handleToastAdd } = useToasts();

  const handleAdd = useCallback(() => {
    handleToastAdd({
      type: "BROWSING_MESSAGE",
      message: { title: "Notification message", content: "You received 2 new messages", duration: 2000, delay: 1000 },
    });
  }, [handleToastAdd]);

  const incrementCount = useCallback(() => setCount(count + 1), [count]);
  incrementCountRef.current = incrementCount;

  const LIMIT = 5;

  useEffect(() => {
    console.log(count);
    if (count >= 1) {
      handleAdd();
      setDoneCount(doneCount + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    console.log(doneCount);
    if (count <= LIMIT) {
      setTimeout(incrementCountRef.current, 1000);
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
      <BrowsingToasts />
    </div>
  );
};

export default TestPage;
