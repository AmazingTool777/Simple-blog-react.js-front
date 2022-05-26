import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./AppBreadcrumbNav.css";

// Components
import { EntityTitleLoader } from "../Loaders";

const AppBreadcrumbNav = ({ isLoading, basePath, baseEntity, title, notFoundMessage }) => {
	const navigate = useNavigate();

	return (
		<nav className="app-breadcrumb-nav d-flex align-items-center py-2">
			<Button
				type="button"
				title="Go back"
				variant="light"
				className="text-secondary fw-bolder me-3"
				onClick={() => navigate(-1)}
			>
				<FontAwesomeIcon icon="arrow-left" />
			</Button>
			<Breadcrumb className="text-nowrap overflow-hidden" listProps={{ className: "mb-0 nowrap flex-nowrap" }}>
				<Breadcrumb.Item linkAs={Link} linkProps={{ to: basePath }}>
					{baseEntity}
				</Breadcrumb.Item>
				<Breadcrumb.Item
					linkAs={title ? "strong" : "em"}
					active={false}
					linkProps={{ className: `text-decoration-none text-${title ? "dark" : "secondary"}` }}
				>
					{isLoading ? <EntityTitleLoader /> : title ? title : notFoundMessage}
				</Breadcrumb.Item>
			</Breadcrumb>
		</nav>
	);
};

export default AppBreadcrumbNav;
