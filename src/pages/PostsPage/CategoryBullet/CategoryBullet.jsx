// Styles
import "./CategoryBullet.css";

const CategoryBullet = ({ isActive = false, category }) => {
	const suffix = isActive ? "primary" : "secondary";
	const className = `category-bullet border border-1 border-${suffix} text-${suffix} px-3 py-2`;
	return <span className={className}>{category.label}</span>;
};

export default CategoryBullet;
