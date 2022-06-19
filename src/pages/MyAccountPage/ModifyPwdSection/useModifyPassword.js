import { useState, useCallback } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API calls
import { updateUserPassword } from "../../../apis/users-api";

// Other custom hooks
import useCurrentUser from "../../../hooks/useCurrentUser";
import useToasts from "../../../hooks/useToasts";

// Initial values of the fields handled by formik
const initialValues = {
  currPassword: "",
  password: "",
  passwordConfirmation: "",
};

// Validation schema by yup of the fields handled by formik
const validationSchema = Yup.object({
  currPassword: Yup.string().required("Your current password is required"),
  password: Yup.string().required("Your new password is missing"),
  passwordConfirmation: Yup.string()
    .required("Your new password is missing")
    .oneOf([Yup.ref("password")], "Incorrect password confirmation"),
});

// Custom hook for the password modification section of the current user
export default function useModifyPassword() {
  const [forceHide, setForceHide] = useState(0);

  const { currentUser } = useCurrentUser();

  const { handleToastAdd } = useToasts();

  // Handles the submission of the password data to the api
  const handleApiSubmit = useCallback(
    async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        const passwordData = { currPassword: values.currPassword, password: values.password };
        await updateUserPassword(currentUser._id, passwordData);
        setSubmitting(false);
        setForceHide(forceHide + 1);
        handleToastAdd({
          type: "OPERATION_MESSAGE",
          message: {
            title: (
              <>
                <FontAwesomeIcon icon="check-circle" className="me-2 text-success" />
                Successful sign in
              </>
            ),
            content: <p className="mb-0 text-success">Your password has been updated successfully</p>,
            duration: 5000,
            delay: 3000,
          },
        });
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        const errorsFields = new Set();
        const errors = {};
        error.response.data.payload.forEach((error) => {
          if (errorsFields.has(error.param)) return;
          errors[error.param] = error.msg;
        });
        setErrors(errors);
      }
    },
    [currentUser._id, forceHide, handleToastAdd]
  );

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleApiSubmit,
  });
  const { currPassword, password, passwordConfirmation } = values;

  const handleReset = useCallback(() => resetForm(), [resetForm]);

  return {
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
  };
}
