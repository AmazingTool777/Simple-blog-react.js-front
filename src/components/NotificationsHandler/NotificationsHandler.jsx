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
      socket.on("post_like", handlePostLikedNotification);
      socket.on("new_post", handleNewPostNotification);
      socket.on("post_comment", handlePostCommentNotification);

      // Unsubscription of socket events on cleanup
      return () => {
        const events = ["new_follower", "post_like", "new_post"];
        events.forEach((e) => socket.off(e));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  function handleNewFollowerNotification(notification) {
    addNotification("New follower", notification);
  }

  function handlePostLikedNotification(notification) {
    addNotification("Post liked", notification);
  }

  function handleNewPostNotification(notification) {
    addNotification("New post", notification);
  }

  function handlePostCommentNotification(notification) {
    addNotification("Post commented", notification);
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
