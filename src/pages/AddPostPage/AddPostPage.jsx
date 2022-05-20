// import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AsyncSelect from "react-select/async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./AddPostPage.css";

// Components
import PhotoPreview from "../../components/PhotoPreview";

const AddPostPage = () => {
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
          <Form id="add-post-form">
            <Form.Group controlId="post-title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title of the post" autoFocus />
            </Form.Group>
            <Form.Group controlId="post-photo" className="mb-3">
              <Form.Label>Photo</Form.Label>
              <PhotoPreview isOpen={true}>
                <div className="post-photo-options mb-2">
                  <PhotoPreview.Trigger as={Button} variant="light" className="me-3">
                    <FontAwesomeIcon icon="file-image" className="me-2" />
                    Pick a photo
                  </PhotoPreview.Trigger>
                </div>
                <PhotoPreview.Preview />
              </PhotoPreview>
            </Form.Group>
            <Form.Group controlId="post-content" className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" placeholder="Content of te post" rows={5} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="post-categories-select">Categories</Form.Label>
              <AsyncSelect id="posts-categories-select" isMulti placeholder="Select a category" />
            </Form.Group>
            <div className="mt-4">
              <Button type="submit" variant="primary" className="me-3">
                Create
              </Button>
              <Button type="reset" variant="outline-secondary">
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AddPostPage;
