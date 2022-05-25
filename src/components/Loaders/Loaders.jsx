import ContentLoader from "react-content-loader";

const ResultsNumberLoader = () => {
	return (
		<ContentLoader style={{ width: "100px" }} viewBox="0 0 20 5">
			<rect x="0" y="0" width="20" height="5" rx="3" ry="3" />
		</ContentLoader>
	);
};

export { ResultsNumberLoader };
