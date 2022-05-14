import ContentLoader from "react-content-loader";

const PostsCategoriesLoaders = ({ number = 2 }) => {
	const bulletWidth = 98;
	const bulletHeight = 38;
	const spacing = 12;

	// Comptuted values
	const width = bulletWidth * number + spacing * (number - 1);
	const bulletRadius = bulletHeight / 2;

	return (
		<ContentLoader style={{ width: `${width}px` }} viewBox={`0 0 ${width} ${bulletHeight}`}>
			{[...Array(number).keys()].map((i) => (
				<rect
					key={`bullet-${i}`}
					x={`${bulletWidth * i + spacing * i}`}
					y="0"
					width={`${bulletWidth}`}
					height={`${bulletHeight}`}
					rx={`${bulletRadius}`}
					ry={`${bulletRadius}`}
				/>
			))}
		</ContentLoader>
	);
};

export default PostsCategoriesLoaders;
