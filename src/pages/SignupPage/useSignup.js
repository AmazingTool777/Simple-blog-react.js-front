import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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

  const { values, errors, touched, handleChange } = useFormik({ initialValues, validationSchema });

  return { step, values, touched, errors, handleChange, handleStepChange: setStep };
}

export default useSignup;
