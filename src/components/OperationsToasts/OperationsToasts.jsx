// Styles
import "./OperationsToasts.css";

// Custom hooks
import useOperationsToasts from "./useOperationsToasts";

// Components
import AppToast from "../AppToast";

const OperationsToasts = () => {
  const { opsMessages, handleHide, handleDelete } = useOperationsToasts();

  return (
    <article id="operations-toasts">
      <div className="d-flex flex-column-reverse">
        {opsMessages.map((message) => (
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

export default OperationsToasts;
