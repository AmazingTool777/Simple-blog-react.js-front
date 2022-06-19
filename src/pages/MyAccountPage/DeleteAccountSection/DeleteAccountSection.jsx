import { useState, useCallback, useRef, memo } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useDeleteAccount from "./useDeleteAccount";

const DeleteAccountSection = () => {
  const submitBtnRef = useRef(null);

  const [modalShow, setModalShow] = useState(false);

  const { password, error, isSubmitting, handlePasswordChange, handlePasswordReset, handleSubmit } = useDeleteAccount();

  const handleShow = useCallback(
    (show) => () => {
      if (!show) handlePasswordReset();
      setModalShow(show);
    },
    [handlePasswordReset]
  );

  return (
    <section className="mt-4">
      <Button type="button" variant="danger" size="lg" disabled={isSubmitting} onClick={handleShow(true)}>
        <FontAwesomeIcon icon="user-times" className="me-3" />
        Delete account
      </Button>
      <Form onSubmit={handleSubmit}>
        <Modal show={modalShow} size="md" centered backdrop="static" onHide={handleShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FontAwesomeIcon icon="user-times" className="me-3" />
              Delete my account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="delete-account-password">
              <Form.Label>Enter your password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your password"
                value={password}
                disabled={isSubmitting}
                isInvalid={!!error}
                onChange={handlePasswordChange}
              />
              <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                variant="outline-secondary"
                className="me-3"
                disabled={isSubmitting}
                onClick={handleShow(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="danger"
                disabled={isSubmitting}
                onClick={() => submitBtnRef.current.click()}
              >
                Confirm
                {isSubmitting && <Spinner animation="border" size="sm" variant="light" className="ms-2" />}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
        <button ref={submitBtnRef} type="submit" style={{ display: "none" }}></button>
      </Form>
    </section>
  );
};

export default memo(DeleteAccountSection);
