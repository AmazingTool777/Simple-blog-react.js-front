import { useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Contexts
import { useSocket } from "../../contexts/socket";
import useToasts from "../../hooks/useToasts";

export default function NotificationsHandler({ children }) {
  const { handleToastAdd } = useToasts();

  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("new_follower", handleNewFollowerNotification);
      socket.on("post_like", handlePostLiked);

      // Unsubscription of socket events on cleanup
      return () => {
        const events = ["new_follower", "post_like"];
        events.forEach((e) => socket.off(e));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  function handleNewFollowerNotification(notification) {
    addNotification("New follower", notification);
  }

  function handlePostLiked(notification) {
    addNotification("Post liked", notification);
  }

  const addNotification = useCallback(
    (title, notification) => {
      handleToastAdd({
        type: "NOTIFICATION",
        message: {
          title: (
            <>
              <FontAwesomeIcon icon="bell" className="me-2 text-dark" />
              {title}
            </>
          ),
          content: notification.message,
        },
      });
    },
    [handleToastAdd]
  );

  return <>{children}</>;
}
