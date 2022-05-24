// Styles
import "./BrowsingToasts.css";

// Custom hooks
import useBrowsingToasts from "./useBrowsingToasts";

// Components
import AppToast from "../AppToast";

const BrowsingToasts = () => {
  const { browsingMessages, handleHide, handleDelete } = useBrowsingToasts();

  return (
    <article id="browsing-toasts">
      <div className="d-flex flex-column-reverse">
        {browsingMessages.map((message) => (
          <AppToast
            key={message.id}
            show={message.show}
            toast={message}
            duration={message.duration}
            delay={message.delay}
            onClose={handleHide}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </article>
  );
};

export default BrowsingToasts;
