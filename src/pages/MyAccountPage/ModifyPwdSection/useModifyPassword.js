import { useCallback } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

// Other custom hooks
// import useCurrentUser from "../../../hooks/useCurrentUser";

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
  // const { currentUser } = useCurrentUser();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema,
  });
  const { currPassword, password, passwordConfirmation } = values;

  const handleReset = useCallback(() => resetForm(), [resetForm]);

  return {
    currPassword,
    password,
    passwordConfirmation,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  };
}
