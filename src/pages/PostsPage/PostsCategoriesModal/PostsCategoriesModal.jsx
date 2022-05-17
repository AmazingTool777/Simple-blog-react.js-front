import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./PostsCategoriesModal.css";

// Custom hooks
import usePostsCategories from "../usePostsCategories";

// Components
import CategoryBullet from "../../../components/CategoryBullet";

const PostsCategoriesModal = ({ categoryId = null, onCategorySelect = () => {} }) => {
  const [show, setShow] = useState(false);

  const mergeCategories = true;
  const {
    categories,
    page,
    handlePageChange,
    handleSearchChange,
    isLoading,
    pages,
    resetCategories,
    triggerInitialCategoriesFetch,
  } = usePostsCategories(mergeCategories);

  const handleModalHide = () => {
    setShow(false);
    resetCategories();
  };

  const handleCategorySelect = (categoryId) => {
    onCategorySelect(categoryId);
    setShow(false);
  };

  return (
    <>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>View all categories</Tooltip>}>
        <Button variant="light" className="text-primary" onClick={() => setShow(true)}>
          <FontAwesomeIcon icon="eye" />
        </Button>
      </OverlayTrigger>
      <Modal
        size="md"
        scrollable
        backdrop="static"
        show={show}
        onEnter={triggerInitialCategoriesFetch}
        onHide={handleModalHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon="list" className="me-2" /> All categories
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-4">
            <div className="input-group-prepend">
              <span className="input-group-text h-100">
                <FontAwesomeIcon icon="search" />
              </span>
            </div>
            <FormControl type="search" placeholder="Search a category" onChange={handleSearchChange} />
          </InputGroup>
          <div>
            {categories.length > 0 || isLoading ? (
              <>
                <div className="d-flex flex-wrap list-unstyled">
                  {categories.map((category) => (
                    <CategoryBullet
                      key={category._id}
                      className="me-3 mb-2"
                      isActive={category._id === categoryId}
                      category={category}
                      onClick={() => handleCategorySelect(category._id)}
                    />
                  ))}
                </div>
                <div className="text-center pt-3">
                  {isLoading ? (
                    <Spinner animation="border" variant="secondary" />
                  ) : page < pages ? (
                    <span
                      id="see-more-suggestions"
                      className="text-secondary mb-0"
                      onClick={() => handlePageChange(page + 1)}
                    >
                      <FontAwesomeIcon icon="plus" className="me-2" />
                      See more
                    </span>
                  ) : (
                    <span className="text-secondary">End of results</span>
                  )}
                </div>
              </>
            ) : (
              <p className="text-center text-secondary">No categories to show</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostsCategoriesModal;
