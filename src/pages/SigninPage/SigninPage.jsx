import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Illustration
import { ReactComponent as LoginIllustration } from "../../assets/images/undraw_login_re_4vu2.svg";

// Styles
import "./SigninPage.css";

const SigninPage = () => {
  return (
    <section id="signin-page" className="d-flex">
      <section className="illustration-section justify-content-center align-items-center">
        <LoginIllustration />
      </section>
      <section className="form-section d-flex justify-content-center align-items-center px-2">
        <div className="form-wrapper px-4 pt-5 pb-4">
          <h1 className="mb-4">
            <FontAwesomeIcon icon="lock" className="me-3" />
            Sign in
          </h1>
          <Form id="signin-form">
            <FloatingLabel controlId="user-email" label="E-mail" className="mb-3">
              <Form.Control type="email" placeholder="Your e-mail address" />
            </FloatingLabel>
            <FloatingLabel controlId="user-password" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Your password" />
            </FloatingLabel>
            <div className="d-grid mt-4">
              <Button type="submit" variant="primary" size="lg">
                Authenticate
              </Button>
            </div>
          </Form>
          <p className="text-muted fst-italic mt-3">
            <small>
              You don't have any account?{" "}
              <strong>
                <Link to="/auth/signup" className="text-decoration-none text-dark">
                  Sign up
                </Link>
              </strong>
            </small>
          </p>
        </div>
      </section>
    </section>
  );
};

export default SigninPage;
