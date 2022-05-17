import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./SignupPage.css";

// Illustration
import { ReactComponent as WelcomeIllustration } from "../../assets/images/undraw_welcome_cats_thqn.svg";
// Custom hooks
import useSignup from "./useSignup";

// Components
import StepIndicators from "./StepIndicators";

const SignupPage = () => {
  const { step, values, handleChange, handleStepChange } = useSignup();

  return (
    <section id="signup-page">
      <div className="form-section">
        <div className="form-container shadow bg-white px-3 py-4">
          <h1 className="text-center mb-4">Sign up</h1>
          <StepIndicators step={step} />
          <Form id="signup" className="mt-4">
            {step === 1 && (
              <>
                <FloatingLabel controlId="user-firstname" label="First name" className="mb-3">
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="user-lastname" label="Last name" className="mb-3">
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <div>
                  <span className="me-3 text-muted">Gender:</span>
                  <Form.Check
                    custom="true"
                    inline
                    type="radio"
                    id="user-gender-male"
                    name="gender"
                    label="Male"
                    value="M"
                    checked={values.gender === "M"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    custom="true"
                    inline
                    type="radio"
                    id="user-gender-female"
                    name="gender"
                    label="Female"
                    value="F"
                    checked={values.gender === "F"}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <FloatingLabel controlId="user-email" label="E-mail" className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="user-password" label="Password" className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="user-password-confirmation" label="Password confirmation" className="mb-3">
                  <Form.Control
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Password confirmation"
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </>
            )}
            <div className="mt-4 d-flex justify-content-between">
              <Button
                type="button"
                variant="outline-secondary"
                style={{ visibility: step === 1 ? "hidden" : "visible" }}
                onClick={() => handleStepChange(step - 1)}
              >
                <FontAwesomeIcon icon="angle-left" className="me-2" />
                Previous
              </Button>
              {step === 1 && (
                <Button type="button" variant="primary" onClick={() => handleStepChange(step + 1)}>
                  Next
                  <FontAwesomeIcon icon="angle-right" className="ms-2" />
                </Button>
              )}
              {step === 2 && (
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              )}
            </div>
          </Form>
          <p className="mb-0 mt-4 text-center">
            <small className="text-secondary fst-italic">
              You already have an account?{" "}
              <Link to="/auth/login" className="text-decoration-none fw-bolder text-dark">
                Sign in
              </Link>
            </small>
          </p>
        </div>
      </div>
      <div className="illustration-section align-items-center">
        <WelcomeIllustration />
      </div>
    </section>
  );
};

export default SignupPage;
