import ContentLoader from "react-content-loader";

const UserCardLoaders = () => {
	return (
		<div className="py-3 px-2">
			<ContentLoader style={{ height: "3.75rem" }} className="mb-4" viewBox="0 0 218 60">
				<circle cx="30" cy="30" r="30" />
				<rect x="68" y="5" width="150" height="20" rx="10" ry="10" />
				<rect x="68" y="35" width="100" height="20" rx="10" ry="10" />
			</ContentLoader>
		</div>
	);
};

export default UserCardLoaders;
