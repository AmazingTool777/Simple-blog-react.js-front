import { useState, useEffect, useCallback, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useModifyPassword from "./useModifyPassword";
import useCheckIfUpdated from "../../../hooks/useCheckIfUpdated";

const ModifyPwdSection = () => {
  /* We hold a ref for the submit button */
  const submitBtnRef = useRef(null);

  const [show, setShow] = useState(false);

  const {
    currPassword,
    password,
    passwordConfirmation,
    errors,
    touched,
    forceHide,
    isSubmitting,
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

  const isUpdated = useCheckIfUpdated();

  /* Forcing the password update modal to hide */
  useEffect(() => {
    if (isUpdated) handleShow(false)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceHide]);

  return (
    <section className="mt-5">
      <Button type="button" variant="warning" size="lg" onClick={handleShow(true)}>
        <FontAwesomeIcon icon="lock" className="me-3" />
        Change password
      </Button>
      <form onSubmit={handleSubmit}>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="user-password-confirmation">
              <Form.Label>Password confirmation:</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.passwordConfirmation}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                disabled={isSubmitting}
                variant="outline-secondary"
                className="me-3"
                onClick={handleShow(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={isSubmitting}
                variant="warning"
                onClick={() => submitBtnRef.current.click()}
              >
                Confirm
                {isSubmitting && <Spinner animation="border" variant="dark" size="sm" className="ms-2" />}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
        <button ref={submitBtnRef} type="submit" style={{ display: "none" }}></button>
      </form>
    </section>
  );
};

export default ModifyPwdSection;
