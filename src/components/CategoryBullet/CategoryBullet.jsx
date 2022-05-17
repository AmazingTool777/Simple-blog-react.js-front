// Styles
import "./CategoryBullet.css";

const CategoryBullet = ({ className = "", isDisabled = false, isActive = false, category, onClick = () => {} }) => {
  const handleClick = () => {
    if (isDisabled) return;
    onClick(category._id);
  };

  const suffix = isActive ? "primary" : "secondary";
  let _className = `category-bullet border border-1 border-${suffix} text-${suffix} px-3 py-2`;
  if (isDisabled) _className += " disabled";
  if (className) _className += ` ${className}`;
  return (
    <span className={_className} onClick={handleClick}>
      {category.label}
    </span>
  );
};

export default CategoryBullet;
