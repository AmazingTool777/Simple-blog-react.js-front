import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./AddPostPage.css";

// Custom hooks
import useAddPost from "./useAddPost";

// Components
import PhotoPreview from "../../components/PhotoPreview";
import CategoriesFields from "./CategoriesFields";
import UploadToast from "./UploadToast";

const AddPostPage = () => {
  const photoRef = useRef(null);

  const {
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
  } = useAddPost();

  const navigate = useNavigate();

  return (
    <section id="add-post-page">
      <div className="container pb-5">
        <Button type="button" variant="light" className="mt-3" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon="arrow-left" className="me-2" />
          Go back
        </Button>
        <hr />
        <h1 className="mt-4 mb-5">
          <FontAwesomeIcon icon="plus" className="me-3" />
          Create a new post
        </h1>
        <div className="form-container">
          <Form id="add-post-form" onSubmit={handleSubmit}>
            <Form.Group controlId="post-title" className="post-title-group mb-4">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title of the post"
                name="title"
                value={values.title}
                isInvalid={!!errors.title && touched.title}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="post-photo" className="post-photo-group mb-4">
              <Form.Label>Photo</Form.Label>
              <PhotoPreview ref={photoRef} name="photo" isOpen={true} onFileChange={handlePhotoChange}>
                <div className="post-photo-options mb-2">
                  <PhotoPreview.Trigger as={Button} disabled={isSubmitting} variant="light" className="me-3">
                    <FontAwesomeIcon icon="file-image" className="me-2" />
                    Pick a photo
                  </PhotoPreview.Trigger>
                </div>
                <Form.Control type="hidden" isInvalid={!!errors.photo && touched.photo} />
                <Form.Control.Feedback type="invalid" className="mb-2">
                  {errors.photo}
                </Form.Control.Feedback>
                <PhotoPreview.Preview className="post-photo-preview" />
              </PhotoPreview>
            </Form.Group>
            <div className="post-content-categories-actions-group">
              <Form.Group controlId="post-content" className="mb-4">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Content of the post"
                  name="content"
                  value={values.content}
                  disabled={isSubmitting}
                  isInvalid={!!errors.content && touched.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
              </Form.Group>
              <CategoriesFields
                isDisabled={isSubmitting}
                newCategories={values.newCategories}
                error={errors.categories}
                isTouched={touched.categories}
                onSelectChange={handleCategoriesChange}
                onNewCategoryAdd={handleNewCategoryAdd}
                onNewCategoryDelete={handleNewCategoryDelete}
                onBlur={handleBlur}
              />
              <div className="mt-5">
                <Button disabled={isSubmitting} type="submit" variant="primary" className="me-3">
                  Create
                  {isSubmitting && <Spinner animation="border" size="sm" variant="light" className="ms-2" />}
                </Button>
                <Button disabled={isSubmitting} type="reset" variant="outline-secondary">
                  Reset
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <UploadToast show={progressShow} percentage={uploadProgress} />
    </section>
  );
};

export default AddPostPage;
