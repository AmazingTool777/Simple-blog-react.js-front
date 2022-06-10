import { useState, useCallback, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API calls
import { updateUserPersoInfo } from "../../../apis/users-api";

// Other custom hooks
import useCurrentUser from "../../../hooks/useCurrentUser";
import useToasts from "../../../hooks/useToasts";

// Validation schema for the personal information fields
const validationSchema = Yup.object({
  firstName: Yup.string().required("This field is required").min(2, "Must contain at least 2 characters"),
  lastName: Yup.string().required("This field is required").min(2, "Must contain at least 2 characters"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().required("This field is required").email("Invalid email format"),
});

// Custom hook for the update of the personal information
export default function useUpdatePersoInfo() {
  const [isOpen, setOpen] = useState(false);

  const { currentUser, setCurrentUser } = useCurrentUser();

  const { handleToastAdd } = useToasts();

  // Initial values for the perso info fields handled by formik
  /* 
  It's important to keep those values inside this custom hook
  since the initial values can change after the update of the current user
  and also because we can only access the current user values from within a custom hook
  */
  const initialValues = useMemo(
    () => ({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      gender: currentUser.gender,
      email: currentUser.email,
    }),
    [currentUser]
  );

  // Handles the fields data submission
  const handleUpdatesSubmit = useCallback(
    async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const updatedUser = await updateUserPersoInfo(currentUser._id, values);
        setCurrentUser(updatedUser);
        setSubmitting(false);
        setOpen(false);
        handleToastAdd({
          type: "OPERATION_MESSAGE",
          message: {
            title: (
              <>
                <FontAwesomeIcon icon="check-circle" className="me-3 text-success" />
                Successful update
              </>
            ),
            content: <p className="mb-0 text-success">Your personal information has been updated succesfully</p>,
            duration: 5000,
            delay: 3000,
          },
        });
      } catch (error) {
        console.log(error);
        setSubmitting(false);
      }
    },
    [currentUser, setCurrentUser, handleToastAdd]
  );

  const { values, errors, isSubmitting, touched, handleChange, handleSubmit, handleBlur, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleUpdatesSubmit,
  });

  // Handles the opening of the form
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  // Handles the closing of the form
  const handleClose = useCallback(() => {
    setOpen(false);
    resetForm();
  }, [resetForm]);

  return {
    user: currentUser,
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
  };
}
