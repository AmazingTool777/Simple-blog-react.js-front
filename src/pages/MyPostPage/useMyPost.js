import { useCallback, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API calls
import { updatePostTextFields } from "../../apis/posts-api";

// Other custom hooks
import useToasts from "../../hooks/useToasts";

// Validation schema for the text fields
const textFieldsValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

// Custom hook for the my post page
export default function useMyPost(post, onPostUpdated) {
  // Initial values for the post's text fields handled by formik
  const textFieldsInitialValues = useMemo(
    () => ({
      title: post ? post.title : "",
      content: post ? post.content : "",
    }),
    [post]
  );

  const { handleToastAdd } = useToasts();

  // Handles the submission of the text fields updates to the API
  const handleTextFieldsApiSubmit = useCallback(
    async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const updatedPost = await updatePostTextFields(post._id, values);
        setSubmitting(false);
        onPostUpdated(updatedPost);
        handleToastAdd({
          type: "OPERATION_MESSAGE",
          message: {
            title: (
              <>
                <FontAwesomeIcon icon="check-circle" className="text-success me-3" />
                Successful update
              </>
            ),
            content: <p className="mb-0 text-success">Your post's text fields has been updated successfully</p>,
            duration: 5000,
            delay: 3000,
          },
        });
      } catch (error) {
        console.log(error);
        setSubmitting(false);
      }
    },
    [handleToastAdd, post._id, onPostUpdated]
  );

  // Formik variables to be used for the post's text fields
  const {
    values: textFieldsValues,
    touched: textFieldsTouched,
    errors: textFieldsErrors,
    isSubmitting: textFieldsIsSubmitting,
    handleBlur: handleTextFieldsBlur,
    handleChange: handleTextFieldsChange,
    handleSubmit: handleTextFieldsSubmit,
    handleReset: handleTextFieldsReset,
  } = useFormik({
    initialValues: textFieldsInitialValues,
    validationSchema: textFieldsValidationSchema,
    onSubmit: handleTextFieldsApiSubmit,
  });

  return {
    post,
    textFieldsValues,
    textFieldsTouched,
    textFieldsErrors,
    textFieldsIsSubmitting,
    handleTextFieldsBlur,
    handleTextFieldsChange,
    handleTextFieldsSubmit,
    handleTextFieldsReset,
  };
}
