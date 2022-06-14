import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

// Styles
import "./MyPostPage.css";

// Custom hooks
import useMyPost from "./useMyPost";
import usePost from "../../hooks/usePost";

// Components
import AppBreadcrumbNav from "../../components/AppBreadcrumbNav";
import CategoriesFields from "../../components/CategoriesFields";

// Wrapper component for the my post page content
const MyPostPageContent = ({ post, onPostUpdated }) => {
  const {
    textFieldsValues,
    textFieldsTouched,
    textFieldsErrors,
    textFieldsIsSubmitting,
    handleTextFieldsChange,
    handleTextFieldsBlur,
    handleTextFieldsReset,
    handleTextFieldsSubmit,
    categoriesValues,
    categoriesIsSubmitting,
    categoriesErrors,
    categoriesTouched,
    handleCategoriesBlur,
    handleCategoriesSubmit,
    handleCategoriesReset,
    handleCategoriesFieldChange,
    handleAddNewCategoryAdd,
    handleNewCategoryDelete,
  } = useMyPost(post, onPostUpdated);

  return (
    <>
      <div className="my-5">
        <img src={post.photoURL} alt={post.title} className="my-post-photo" />
      </div>
      <section className="my-post-form-section mb-5">
        <h4 className="mb-4">Text fields</h4>
        <form onSubmit={handleTextFieldsSubmit} onReset={handleTextFieldsReset}>
          <Form.Group controlId="my-post-title" className="mb-3">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name="title"
              placeholder="The post's title"
              disabled={textFieldsIsSubmitting}
              value={textFieldsValues.title}
              isInvalid={textFieldsTouched.title && !!textFieldsErrors.title}
              onChange={handleTextFieldsChange}
              onBlur={handleTextFieldsBlur}
            />
            <Form.Control.Feedback type="invalid">{textFieldsErrors.title}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="my-post-content">
            <Form.Label>Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              placeholder="The post's content"
              disabled={textFieldsIsSubmitting}
              value={textFieldsValues.content}
              isInvalid={textFieldsTouched.content && !!textFieldsErrors.content}
              onChange={handleTextFieldsChange}
              onBlur={handleTextFieldsBlur}
            />
            <Form.Control.Feedback type="invalid">{textFieldsErrors.content}</Form.Control.Feedback>
          </Form.Group>
          <div className="mt-4 d-flex">
            <Button type="submit" variant="primary" disabled={textFieldsIsSubmitting}>
              Save
              {textFieldsIsSubmitting && <Spinner animation="border" variant="light" size="sm" className="ms-3" />}
            </Button>
            <Button type="reset" variant="outline-secondary" className="ms-3" disabled={textFieldsIsSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </section>
      <section className="my-post-form-section">
        <h4 className="mb-4">Categories</h4>
        <form onSubmit={handleCategoriesSubmit} onReset={handleCategoriesReset}>
          <CategoriesFields
            isDisabled={categoriesIsSubmitting}
            initialCategories={post.categories}
            newCategories={categoriesValues.newCategories}
            error={categoriesErrors.categories}
            isTouched={categoriesTouched.categories}
            onBlur={handleCategoriesBlur}
            onSelectChange={handleCategoriesFieldChange}
            onNewCategoryAdd={handleAddNewCategoryAdd}
            onNewCategoryDelete={handleNewCategoryDelete}
          />
          <div className="mt-4 d-flex">
            <Button type="submit" variant="primary" disabled={categoriesIsSubmitting}>
              Save
              {categoriesIsSubmitting && <Spinner animation="border" variant="light" size="sm" className="ms-3" />}
            </Button>
            <Button type="reset" variant="outline-secondary" className="ms-3" disabled={categoriesIsSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

const MyPostPage = () => {
  const { postId } = useParams();

  const { isLoading, post, handlePostChange } = usePost(postId);

  return (
    <section id="my-post-page">
      <AppBreadcrumbNav
        isLoading={isLoading}
        basePath="/personal-space/posts"
        baseEntity="My posts"
        title={post && post.title}
        notFoundMessage="Post not found"
      />
      {!isLoading && post && <MyPostPageContent post={post} onPostUpdated={handlePostChange} />}
    </section>
  );
};

export default MyPostPage;
