// Styles
import "./CategoryBullet.css";

const CategoryBullet = ({ isDisabled = false, isActive = false, category, onClick = () => {} }) => {
  const handleClick = () => {
    if (isDisabled) return;
    onClick(category._id);
  };

  const suffix = isActive ? "primary" : "secondary";
  let className = `category-bullet border border-1 border-${suffix} text-${suffix} px-3 py-2`;
  if (isDisabled) className += " disabled";
  return (
    <span className={className} onClick={handleClick}>
      {category.label}
    </span>
  );
};

export default CategoryBullet;
