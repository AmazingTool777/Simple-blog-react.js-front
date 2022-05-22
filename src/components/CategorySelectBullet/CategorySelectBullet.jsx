// Styles
import "./CategorySelectBullet.css";

const CategorySelectBullet = ({ className, category, onDelete = () => {} }) => {
  let containerClassName = "category-select-bullet bg-secondary d-flex align-items-center py-2 px-3";
  if (className) containerClassName += ` ${className}`;

  return (
    <div className={containerClassName}>
      <span className="label text-light">{category.label}</span>
      <span className="ms-2 delete" onClick={() => onDelete(category)}>
        &times;
      </span>
    </div>
  );
};

export default CategorySelectBullet;
