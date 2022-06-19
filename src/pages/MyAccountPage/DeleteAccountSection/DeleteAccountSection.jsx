import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteAccountSection = () => {
  return (
    <section className="mt-4">
      <Button type="button" variant="danger" size="lg">
        <FontAwesomeIcon icon="user-times" className="me-3" />
        Delete account
      </Button>
    </section>
  );
};

export default DeleteAccountSection;
