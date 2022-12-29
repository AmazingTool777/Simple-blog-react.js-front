import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Contexts
import { useSocket } from "../../contexts/socket";

// API calls
import { loginUser } from "../../apis/users-api";

// Custom hooks
import useCurrentUser from "../../hooks/useCurrentUser";
import useToasts from "../../hooks/useToasts";

// Initial values for the login crendentials fields
const initialValues = {
  email: "",
  password: "",
};

// Validation schema for the login credentials fields
const validationSchema = Yup.object({
  email: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
});

// Custom hook the sign in page
function useLogin() {
  const { connectSocket } = useSocket();

  const { setCurrentUser } = useCurrentUser();

  const navigate = useNavigate();

  const { state } = useLocation();
  // Referrer path to redirect to after sign in
  const from = state?.from;

  const { handleToastAdd } = useToasts();

  // Handles the submission of the login credentials to the api
  const handleApiSubmit = useCallback(
    async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        const loggedUser = await loginUser(values);
        // Setting the current logged in user
        setCurrentUser(loggedUser);
        // Reconnecting with a new websocket connection
        connectSocket();
        // Triggering the corresponding toast
        handleToastAdd({
          type: "BROWSING_MESSAGE",
          message: {
            title: (
              <>
                <FontAwesomeIcon icon="check-circle" className="me-2 text-success" />
                Successful sign in
              </>
            ),
            content: (
              <p className="mb-0">
                Welcome back {loggedUser.gender === "M" ? "mr" : "mrs"}{" "}
                <strong>
                  {loggedUser.firstName} {loggedUser.lastName}
                </strong>
              </p>
            ),
            duration: 5000,
          },
        });
        // Redirection
        navigate(from || "/posts");
      } catch (error) {
        setSubmitting(false);
        if (error.response.status === 400)
          setErrors({
            email: error.response.data.message,
            password: error.response.data.message,
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate, setCurrentUser, from, handleToastAdd]
  );

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleApiSubmit,
  });

  return { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit };
}

export default useLogin;
