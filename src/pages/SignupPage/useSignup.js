import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API calls
import { signupUser } from "../../apis/users-api";

// Other custom hooks
import useCurrentUser from "../../hooks/useCurrentUser";
import useToasts from "../../hooks/useToasts";

// Initial fields values
const initialValues = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

// Validation schema for the fields' values
const validationSchema = Yup.object({
  firstName: Yup.string().required("This field is required").min(2, "Must contain at least 2 characters"),
  lastName: Yup.string().required("This field is required").min(2, "Must contain at least 2 characters"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().required("This field is required").email("Invalid email format"),
  password: Yup.string().required("This field is required").min(5, "Must contain at least 5 characters"),
  passwordConfirmation: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("password")], "Incorrect password confirmation"),
});

// Custom hook for the signup page
function useSignup() {
  const [step, setStep] = useState(1);
  const [isApiSubmitting, setApiSubmitting] = useState(false);

  const { setCurrentUser } = useCurrentUser();

  const navigate = useNavigate();

  const { handleToastAdd } = useToasts();

  // Handles the submission of the fields' data after validation
  const handleSubmit = useCallback(
    async (values, { setSubmitting }) => {
      setSubmitting(true);
      setApiSubmitting(true);
      try {
        const signedUpUser = await signupUser(values);
        // Setting the newly signed up user as the current logged in user
        setCurrentUser(signedUpUser);
        // Triggering a toast
        handleToastAdd({
          type: "OPERATION_MESSAGE",
          title: (
            <>
              <FontAwesomeIcon icon="check-circle" className="me-2 text-success" />
              Sign up complete
            </>
          ),
          content: (
            <p className="mb-0">
              Welcome {signedUpUser.gender === "M" ? "mr" : "mrs"}{" "}
              <strong>
                {signedUpUser.firstName} {signedUpUser.lastName}
              </strong>
            </p>
          ),
        });
        // Redirection to the current user's personal space page
        navigate("/personal-space");
      } catch (error) {
        setApiSubmitting(false);
        setSubmitting(false);
        // Triggering a toast
        handleToastAdd({
          type: "OPERATION_MESSAGE",
          title: (
            <>
              <FontAwesomeIcon icon="times-circle" className="me-2 text-danger" />
              {error.status < 500 ? "Incorrect values" : "Unknown error"}
            </>
          ),
          content: (
            <p className="text-danger mb-0">
              {error.status < 500 ? "Please send correct values" : "An unknown error occured. Please try again."}
            </p>
          ),
        });
      }
    },
    [setCurrentUser, navigate, handleToastAdd]
  );

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return {
    step,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleFormSubmit,
    isSubmitting: isSubmitting || isApiSubmitting,
    handleStepChange: setStep,
  };
}

export default useSignup;
