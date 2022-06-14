import { useCallback, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API calls
import { updatePostTextFields, updatePostCategories } from "../../apis/posts-api";

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
function generateSuccessOpToastMessage(content) {
  return {
    type: "OPERATION_MESSAGE",
    message: {
      title: (
        <>
          <FontAwesomeIcon icon="check-circle" className="text-success me-3" />
          Successful update
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
        handleToastAdd(generateSuccessOpToastMessage("Your post's text fields has been updated successfully"));
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
    async (values, { setSubmitting, setFieldValue }) => {
      const categoriesData = {
        categories: values.categories.map((category) => category._id),
        newCategories: values.newCategories.map((category) => category.label),
      };
      console.log(categoriesData);
      try {
        const updatedPost = await updatePostCategories(
          post._id,
          categoriesData.categories,
          categoriesData.newCategories
        );
        setSubmitting(false);
        onPostUpdated(updatedPost);
      } catch (error) {
        console.log(error);
        setSubmitting(false);
      }
    },
    [post, onPostUpdated]
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
  }, [post, setCategoriesFieldValue]);

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
  };
}
