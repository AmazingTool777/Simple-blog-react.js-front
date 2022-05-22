import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// API calls
import { addPost } from "../../apis/posts-api";

// Initial values for the post fields
const initialValues = {
  title: "",
  content: "",
  photo: null,
  categories: [],
  newCategories: [],
};

// Supported formats for the post photo
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

// Validation schema for the posts fields
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  photo: Yup.mixed()
    .required("You must pick a post photo")
    .test("fileSize", "The photo is too large", (photo) => {
      return photo && photo.size <= 5000000;
    })
    .test("fileExtension", "Unsupported image format", (photo) => {
      return photo && SUPPORTED_FORMATS.includes(photo.type);
    }),
  categories: Yup.array()
    .of(Yup.mixed())
    .test("required-categories", "Select at least one category", function (categories) {
      return categories.length > 0 || this.parent.newCategories.length > 0;
    }),
  newCategories: Yup.array().of(Yup.mixed()),
});

// Custom for the add post page
function useAddPost() {
  const [progressShow, setProgressShow] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  // Handles the progress of the upload
  const handleUploadProgress = useCallback((percentage) => setUploadProgress(percentage), []);

  // Handles the submission of the post data to the API after validation
  const handleApiSubmit = useCallback(
    async (values, { setSubmitting }) => {
      try {
        // Formatting the correct data to send to the API
        const postData = new FormData();
        postData.append("photo", values.photo);
        postData.append("title", values.title);
        postData.append("content", values.content);
        values.categories.forEach((category) => postData.append("categories[]", category._id));
        values.newCategories.forEach((category) => postData.append("newCategories[]", category.label));
        // Uploading
        setProgressShow(true);
        setSubmitting(true);
        await addPost(postData, handleUploadProgress);
        setProgressShow(false);
        // Redirection
        navigate("/posts");
      } catch (error) {
        console.log(error);
        setProgressShow(false);
        setSubmitting(false);
      }
    },
    [handleUploadProgress, navigate]
  );

  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleApiSubmit,
  });

  // Handles the change of the photo file input
  const handlePhotoChange = useCallback(
    (e) => {
      setFieldValue("photo", e.target.files[0]);
    },
    [setFieldValue]
  );

  // Handles the chnage of the categories
  const handleCategoriesChange = useCallback(
    (categories) => {
      setFieldValue("categories", categories);
    },
    [setFieldValue]
  );

  // Handles the addition of a new category
  const handleNewCategoryAdd = useCallback(
    (newCategory) => {
      const newCategories = [...values.newCategories];
      if (
        !newCategories.find((category) => category.label === newCategory.label) &&
        !values.categories.find((category) => category.label === newCategory.label)
      ) {
        newCategories.push(newCategory);
      }
      setFieldValue("newCategories", newCategories);
    },
    [values, setFieldValue]
  );

  // Handles the deletion of a new category
  const handleNewCategoryDelete = useCallback(
    (label) => {
      setFieldValue(
        "newCategories",
        values.newCategories.filter((category) => category !== label)
      );
    },
    [values, setFieldValue]
  );

  return {
    values,
    touched,
    errors,
    isSubmitting,
    progressShow,
    uploadProgress,
    handleChange,
    handlePhotoChange,
    handleCategoriesChange,
    handleNewCategoryAdd,
    handleNewCategoryDelete,
    handleBlur,
    handleSubmit,
  };
}

export default useAddPost;
