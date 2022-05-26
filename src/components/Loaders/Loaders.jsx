import ContentLoader from "react-content-loader";

const ResultsNumberLoader = () => {
	return (
		<ContentLoader style={{ width: "100px" }} viewBox="0 0 20 5">
			<rect x="0" y="0" width="20" height="5" rx="3" ry="3" />
		</ContentLoader>
	);
};

// Loader for an entity title in the breadcrumb
const EntityTitleLoader = () => (
	<ContentLoader style={{ width: "150px", height: "21px" }} viewBox="0 0 150 21">
		<rect x={0} y={0} width={151} height={21} rx="10" ry="10" />
	</ContentLoader>
);

export { ResultsNumberLoader, EntityTitleLoader };
