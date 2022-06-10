import { useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Custom hooks
import { useSignupDialog } from "../../contexts/signoutDialog";
import useCurrentUser from "../../hooks/useCurrentUser";

const LogoutDialog = () => {
  const { logout } = useCurrentUser();

  const { signoutDialogShow, handleSignoutModalShow } = useSignupDialog();

  const handleSignout = useCallback(() => {
    logout(() => handleSignoutModalShow(false));
  }, [handleSignoutModalShow, logout]);

  return (
    <Modal
      centered
      size="sm"
      animation={true}
      backdrop="static"
      aria-labelledby="signout-modal"
      show={signoutDialogShow}
      onHide={() => handleSignoutModalShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="signout-modal">Sign out confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fs-5 lead">Do you really want to sign out?</p>
      </Modal.Body>
      <Modal.Footer>
        <d-flex className="justify-content-end">
          <Button
            type="button"
            variant="outline-secondary"
            className="me-3"
            onClick={() => handleSignoutModalShow(false)}
          >
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={handleSignout}>
            Confirm
          </Button>
        </d-flex>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutDialog;
