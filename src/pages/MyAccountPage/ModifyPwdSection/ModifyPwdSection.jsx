import { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useModifyPassword from "./useModifyPassword";

const ModifyPwdSection = () => {
  const [show, setShow] = useState(false);

  const {
    currPassword,
    password,
    passwordConfirmation,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = useModifyPassword();

  const handleShow = useCallback(
    (show) => () => {
      if (!show) handleReset();
      setShow(show);
    },
    [handleReset]
  );

  return (
    <section className="mt-5">
      <Button type="button" variant="warning" size="lg" onClick={handleShow(true)}>
        <FontAwesomeIcon icon="lock" className="me-3" />
        Change password
      </Button>
      <Form onSubmit={handleSubmit}>
        <Modal show={show} size="md" backdrop="static" onHide={handleShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FontAwesomeIcon icon="lock" className="me-3" />
              Change my password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="user-curr-password" className="mb-3">
              <Form.Label>Your current password:</Form.Label>
              <Form.Control
                type="password"
                name="currPassword"
                value={currPassword}
                isInvalid={touched.currPassword && !!errors.currPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.currPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="user-password" className="mb-3">
              <Form.Label>Your new password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                isInvalid={touched.password && !!errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="user-password-confirmation">
              <Form.Label>Your new password:</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.passwordConfirmation}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="outline-secondary" className="me-3" onClick={handleShow(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="warning">
                Confirm
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </Form>
    </section>
  );
};

export default ModifyPwdSection;
