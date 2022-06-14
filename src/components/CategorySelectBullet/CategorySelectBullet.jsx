import { useCallback } from "react";

// Styles
import "./CategorySelectBullet.css";

const CategorySelectBullet = ({ isDisabled = false, className, category, onDelete = () => {} }) => {
  let containerClassName = "category-select-bullet bg-secondary d-flex align-items-center py-2 px-3";
  if (className) containerClassName += ` ${className}`;
  if (isDisabled) containerClassName += " disabled";

  const handleDelete = useCallback(() => {
    !isDisabled && onDelete(category);
  }, [onDelete, isDisabled, category]);

  return (
    <div className={containerClassName}>
      <span className="label text-light">{category.label}</span>
      <span className="ms-2 delete" onClick={handleDelete}>
        &times;
      </span>
    </div>
  );
};

export default CategorySelectBullet;
