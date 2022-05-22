import { useState, useCallback, useRef, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AsyncSelect from "react-select/async";

// Custom hooks
import useCategoriesFields from "./useCategoriesFields";

// Components
import CategorySelectBullet from "../../../components/CategorySelectBullet";

const CategoriesFields = ({
  error,
  isTouched,
  newCategories,
  onSelectChange,
  onNewCategoryAdd,
  onNewCategoryDelete,
  onBlur,
}) => {
  const newCategoriesInputRef = useRef(null);

  const [newCategoryLabel, setNewCategoryLabel] = useState("");

  const { handleSelectionChange, fetchCategoriesOnInputChange } = useCategoriesFields(onSelectChange);

  // Handles the addition of a new category
  const handleNewCategoryAdd = useCallback(() => {
    onNewCategoryAdd({ label: newCategoryLabel });
    setNewCategoryLabel("");
  }, [newCategoryLabel, onNewCategoryAdd]);

  // Styles function for the select's control
  const controlStylesFn = useCallback(
    (provided, state) => {
      const styles = { ...provided };
      if (!state.isFocused && error && isTouched) styles.borderColor = "#dc3545";
      return styles;
    },
    [error, isTouched]
  );

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="post-categories-select">Categories</Form.Label>
        <AsyncSelect
          isMulti
          isClearable
          id="posts-categories-select"
          placeholder="Select a category"
          styles={{ control: controlStylesFn }}
          defaultOptions
          loadOptions={fetchCategoriesOnInputChange}
          onChange={handleSelectionChange}
          onBlur={() => newCategoriesInputRef.current.blur()}
        />
      </Form.Group>
      <Form.Group controlId="post-new-categories" className="d-flex flex-wrap mb-2">
        <Form.Control
          ref={newCategoriesInputRef}
          type="text"
          placeholder="New category"
          size="sm"
          style={{ width: "fit-content" }}
          name="categories"
          value={newCategoryLabel}
          isInvalid={!!error && isTouched}
          onChange={(e) => setNewCategoryLabel(e.target.value)}
          onBlur={onBlur}
        />
        <Button type="button" variant="secondary" size="sm" className="ms-2" onClick={handleNewCategoryAdd}>
          <FontAwesomeIcon icon="plus" className="me-2" />
          Add
        </Button>
        <Form.Control.Feedback type="invalid" className="w-100">
          {error}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex">
        {newCategories.map((category) => (
          <CategorySelectBullet
            key={category.label}
            category={category}
            className="me-2"
            onDelete={onNewCategoryDelete}
          />
        ))}
      </div>
    </>
  );
};

export default memo(CategoriesFields);
