import { useMemo } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
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
	const { step, values, touched, errors, handleChange, handleBlur, handleFormSubmit, isSubmitting, handleStepChange } =
		useSignup();

	// Checks if step 1 has errors
	const step1HasErrors = useMemo(() => Boolean(errors.firstName || errors.lastName || errors.gender), [errors]);

	// Checks if one of step 1 fields has been touched
	const step1IsTouched = useMemo(() => Boolean(touched.firstName || touched.lastName || touched.gender), [touched]);

	return (
		<section id="signup-page">
			<div className="form-section">
				<div className="form-container shadow bg-white px-3 py-4">
					<h1 className="text-center mb-4">Sign up</h1>
					<StepIndicators step={step} />
					<Form id="signup" className="mt-4" onSubmit={handleFormSubmit}>
						{step === 1 && (
							<>
								<FloatingLabel controlId="user-firstname" label="First name" className="mb-3">
									<Form.Control
										type="text"
										name="firstName"
										placeholder="First name"
										value={values.firstName}
										isInvalid={!!errors.firstName && touched.firstName}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
								</FloatingLabel>
								<FloatingLabel controlId="user-lastname" label="Last name" className="mb-3">
									<Form.Control
										type="text"
										name="lastName"
										placeholder="Last name"
										value={values.lastName}
										isInvalid={!!errors.lastName && touched.lastName}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
								</FloatingLabel>
								<Form.Group>
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
										isInvalid={!!errors.gender && touched.gender}
										feedback={errors.gender}
										feedbackTooltip
										onChange={handleChange}
										onBlur={handleBlur}
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
										isInvalid={!!errors.gender && touched.gender}
										feedback={errors.gender}
										feedbackTooltip
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</Form.Group>
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
										isInvalid={!!errors.email && touched.email}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
								</FloatingLabel>
								<FloatingLabel controlId="user-password" label="Password" className="mb-3">
									<Form.Control
										type="password"
										name="password"
										placeholder="Password"
										value={values.password}
										isInvalid={!!errors.password && touched.password}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
								</FloatingLabel>
								<FloatingLabel controlId="user-password-confirmation" label="Password confirmation" className="mb-3">
									<Form.Control
										type="password"
										name="passwordConfirmation"
										placeholder="Password confirmation"
										value={values.passwordConfirmation}
										isInvalid={!!errors.passwordConfirmation && touched.passwordConfirmation}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<Form.Control.Feedback type="invalid">{errors.passwordConfirmation}</Form.Control.Feedback>
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
								<Button
									type="buttom"
									disabled={!step1IsTouched || step1HasErrors}
									variant="primary"
									onClick={() => handleStepChange(step + 1)}
								>
									Next
									<FontAwesomeIcon icon="angle-right" className="ms-2" />
								</Button>
							)}
							{step === 2 && (
								<Button type="submit" variant="primary" disabled={isSubmitting}>
									Submit
									{isSubmitting && <Spinner animation="border" variant="light" size="sm" className="ms-2" />}
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
