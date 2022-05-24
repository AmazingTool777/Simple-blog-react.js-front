import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// API calls
import { loginUser } from "../../apis/users-api";

// Custom hooks
import useCurrentUser from "../../hooks/useCurrentUser";

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
  const { setCurrentUser } = useCurrentUser();

  const navigate = useNavigate();

  const { state } = useLocation();
  // Referrer path to redirect to after sign in
  const from = state?.from;

  // Handles the submission of the login credentials to the api
  const handleApiSubmit = useCallback(
    async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        const loggedUser = await loginUser(values);
        setCurrentUser(loggedUser); // Setting the current logged in user
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
    [navigate, setCurrentUser, from]
  );

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleApiSubmit,
  });

  return { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit };
}

export default useLogin;
