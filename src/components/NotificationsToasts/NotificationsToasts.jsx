// Styles
import "./NotificationsToasts.css";

// Custom hooks
import useNotificationsToasts from "./useNotificationsToasts";

// Components
import AppToast from "../AppToast";

const NotificationsToasts = () => {
  const { notifications, handleHide, handleDelete } = useNotificationsToasts();

  return (
    <aside id="notifications-toasts">
      <div className="d-flex flex-column">
        {notifications.map((message) => (
          <AppToast key={message.id} show={message.show} toast={message} onClose={handleHide} onDelete={handleDelete} />
        ))}
      </div>
    </aside>
  );
};

export default NotificationsToasts;
