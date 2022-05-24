import { useState, useCallback, useMemo } from "react";

// Toasts context
import toastsContext from "../../contexts/toasts-context";

const ToastsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [browsingMessages, setBrowsingMessages] = useState([]);
  const [opsMessages, setOpsMessages] = useState([]);

  // Picks a toast messages field based on the type
  const getToastMessagesFromType = useCallback(
    (type) => {
      let messages, setMessages;
      switch (type) {
        case "NOTIFICATION":
          messages = notifications;
          setMessages = setNotifications;
          break;
        case "BROWSING_MESSAGE":
          messages = browsingMessages;
          setMessages = setBrowsingMessages;
          break;
        case "OPERATION_MESSAGE":
          messages = opsMessages;
          setMessages = setOpsMessages;
          break;
        default:
          throw new Error("Unrecognized toast type");
      }
      return { messages, setMessages };
    },
    [browsingMessages, notifications, opsMessages]
  );

  // Handles the addition of a new toast
  const handleToastAdd = useCallback(
    (toast) => {
      const { type, message } = toast;
      const { messages, setMessages } = getToastMessagesFromType(type);
      setMessages([...messages, { id: Date.now(), show: true, ...message }]);
    },
    [getToastMessagesFromType]
  );

  // Handles the hide of a toast
  const handleToastHide = useCallback(
    (toast) => {
      const { type, message } = toast;
      const { messages, setMessages } = getToastMessagesFromType(type);
      const i = messages.indexOf(message);
      const _messages = [...messages];
      _messages[i] = { ...message, show: false };
      setMessages(_messages);
    },
    [getToastMessagesFromType]
  );

  // Handles the deletion of a toast
  const handleToastDelete = useCallback(
    (toast) => {
      const { type, message } = toast;
      const { messages, setMessages } = getToastMessagesFromType(type);
      setMessages(messages.filter((_message) => _message !== message));
    },
    [getToastMessagesFromType]
  );

  const contextValues = useMemo(
    () => ({
      notifications,
      browsingMessages,
      opsMessages,
      handleToastAdd,
      handleToastHide,
      handleToastDelete,
    }),
    [browsingMessages, handleToastAdd, handleToastDelete, handleToastHide, notifications, opsMessages]
  );

  return <toastsContext.Provider value={contextValues}>{children}</toastsContext.Provider>;
};

export default ToastsProvider;
