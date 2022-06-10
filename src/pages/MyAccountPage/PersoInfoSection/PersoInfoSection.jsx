import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useUpdatePersoInfo from "./useUpdatePersoInfo";

// Components
import ToggleableInput from "../ToggleableInput";

const PersoInfoSection = () => {
  const {
    user,
    isOpen,
    isSubmitting,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleOpen,
    handleClose,
  } = useUpdatePersoInfo();

  return (
    <section>
      <h2 className="fs-3 mb-4">Personal information</h2>
      <Form className="d-flex" onSubmit={handleSubmit}>
        <div>
          <Form.Group controlId="current-user-firstname" className="mb-3">
            <Form.Label>First name:</Form.Label>
            <ToggleableInput
              isOpen={isOpen}
              name="firstName"
              placeholder="Your first name"
              autoFocus={true}
              disabled={isSubmitting}
              defaultValue={user.firstName}
              value={values.firstName}
              error={errors.firstName}
              isTouched={touched.firstName}
              onChange={handleChange}
              onBlur={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="current-user-lastname" className="mb-3">
            <Form.Label>Last name:</Form.Label>
            <ToggleableInput
              isOpen={isOpen}
              name="lastName"
              placeholder="Your last name"
              disabled={isSubmitting}
              defaultValue={user.lastName}
              value={values.lastName}
              error={errors.lastName}
              isTouched={touched.lastName}
              onChange={handleChange}
              onBlur={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            Gender:
            {isOpen ? (
              <>
                <Form.Check
                  type="radio"
                  className="ms-3"
                  label="Male"
                  name="gender"
                  id="current-user-gender-male"
                  value="M"
                  disabled={isSubmitting}
                  checked={values.gender === "M"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  className="ms-3"
                  label="Female"
                  name="gender"
                  id="current-user-gender-female"
                  value="F"
                  disabled={isSubmitting}
                  checked={values.gender === "F"}
                  onChange={handleChange}
                />
              </>
            ) : (
              <strong> {user.gender === "M" ? "Male" : "Female"}</strong>
            )}
          </Form.Group>
          <Form.Group controlId="current-user-email" className="mb-3">
            <Form.Label>E-mail:</Form.Label>
            <ToggleableInput
              isOpen={isOpen}
              name="email"
              placeholder="Your e-mail address"
              disabled={isSubmitting}
              defaultValue={user.email}
              value={values.email}
              error={errors.email}
              isTouched={touched.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {isOpen && (
            <div>
              <Button type="submit" disabled={isSubmitting} variant="primary">
                Confirm
                {isSubmitting && <Spinner animation="border" variant="light" size="sm" className="ms-2" />}
              </Button>
              <Button
                type="button"
                disabled={isSubmitting}
                variant="outline-secondary"
                className="ms-3"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
        {!isOpen && (
          <div className="ms-4">
            <Button type="button" variant="warning" onClick={handleOpen}>
              <FontAwesomeIcon icon="pen-square" className="me-2" />
              Edit
            </Button>
          </div>
        )}
      </Form>
    </section>
  );
};

export default PersoInfoSection;
