import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API calls
import { updatePostTextFields, updatePostCategories, deletePost } from "../../apis/posts-api";

// Other custom hooks
import useToasts from "../../hooks/useToasts";

// Validation schema for the text fields
const textFieldsValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

// Validation schema for the categories
const categoriesValidationSchema = Yup.object({
  categories: Yup.array()
    .of(Yup.mixed())
    .test("required-categories", "Select at least one category", function (categories) {
      return categories.length > 0 || this.parent.newCategories.length > 0;
    }),
  newCategories: Yup.array().of(Yup.mixed()),
});

// Generates a successful toast message for the local operations
function generateSuccessOpToastMessage(title, content) {
  return {
    type: "OPERATION_MESSAGE",
    message: {
      title: (
        <>
          <FontAwesomeIcon icon="check-circle" className="text-success me-3" />
          {title}
        </>
      ),
      content: <p className="mb-0 text-success">{content}</p>,
      duration: 5000,
      delay: 3000,
    },
  };
}

// Custom hook for the my post page
export default function useMyPost(post, onPostUpdated) {
  const [isDeleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  const { handleToastAdd } = useToasts();

  // Initial values for the post's text fields handled by formik
  const textFieldsInitialValues = useMemo(
    () => ({
      title: post ? post.title : "",
      content: post ? post.content : "",
    }),
    [post]
  );

  // Handles the submission of the text fields updates to the API
  const handleTextFieldsApiSubmit = useCallback(
    async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const updatedPost = await updatePostTextFields(post._id, values);
        setSubmitting(false);
        onPostUpdated(updatedPost);
        handleToastAdd(
          generateSuccessOpToastMessage("Successful update", "Your post's text fields have been updated successfully")
        );
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

  // Initial values for the categories fields
  const categoriesInitialValues = useMemo(
    () => ({
      categories: post ? post.categories : [],
      newCategories: [],
    }),
    [post]
  );

  // Handles the submission of the categories to the API
  const handleCategoriesApiSubmit = useCallback(
    async (values, { setSubmitting }) => {
      const categoriesData = {
        categories: values.categories.map((category) => category._id),
        newCategories: values.newCategories.map((category) => category.label),
      };
      try {
        const updatedPost = await updatePostCategories(
          post._id,
          categoriesData.categories,
          categoriesData.newCategories
        );
        setSubmitting(false);
        onPostUpdated(updatedPost);
        handleToastAdd(
          generateSuccessOpToastMessage("Successful update", "Your post's categories have been updated successfully")
        );
      } catch (error) {
        console.log(error);
        setSubmitting(false);
      }
    },
    [post._id, onPostUpdated, handleToastAdd]
  );

  // Formik variables to be used for the categories fields
  const {
    values: categoriesValues,
    touched: categoriesTouched,
    errors: categoriesErrors,
    isSubmitting: categoriesIsSubmitting,
    handleBlur: handleCategoriesBlur,
    handleSubmit: handleCategoriesSubmit,
    handleReset: handleCategoriesReset,
    setFieldValue: setCategoriesFieldValue,
  } = useFormik({
    initialValues: categoriesInitialValues,
    validationSchema: categoriesValidationSchema,
    onSubmit: handleCategoriesApiSubmit,
  });

  const handleCategoriesFieldChange = useCallback(
    (categories) => {
      setCategoriesFieldValue("categories", categories);
    },
    [setCategoriesFieldValue]
  );

  const handleAddNewCategoryAdd = useCallback(
    (newCategory) => {
      const newCategories = [...categoriesValues.newCategories];
      if (
        !newCategories.find((category) => category.label === newCategory.label) &&
        !categoriesValues.categories.find((category) => category.label === newCategory.label)
      ) {
        newCategories.push(newCategory);
      }
      setCategoriesFieldValue("newCategories", newCategories);
    },
    [categoriesValues, setCategoriesFieldValue]
  );

  const handleNewCategoryDelete = useCallback(
    (label) => {
      setCategoriesFieldValue(
        "newCategories",
        categoriesValues.newCategories.filter((category) => category !== label)
      );
    },
    [categoriesValues, setCategoriesFieldValue]
  );

  // Updates the categories after the post had been updated
  useEffect(() => {
    setCategoriesFieldValue("categories", post.categories);
    setCategoriesFieldValue("newCategories", []);
  }, [post.categories, setCategoriesFieldValue]);

  const handlePostDelete = useCallback(async () => {
    try {
      setDeleting(true);
      await deletePost(post._id);
      handleToastAdd(generateSuccessOpToastMessage("Successful deletion", "Your post has been deleted successfully"));
      navigate("/personal-space/posts");
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  }, [handleToastAdd, navigate, post._id]);

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
    categoriesValues,
    categoriesTouched,
    categoriesErrors,
    categoriesIsSubmitting,
    handleCategoriesBlur,
    handleCategoriesSubmit,
    handleCategoriesReset,
    handleCategoriesFieldChange,
    handleAddNewCategoryAdd,
    handleNewCategoryDelete,
    isDeleting,
    handlePostDelete,
  };
}
