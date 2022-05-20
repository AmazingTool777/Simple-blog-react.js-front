import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AsyncSelect from "react-select/async";

const CategoriesFields = () => {
	return (
		<>
			<Form.Group className="mb-3">
				<Form.Label htmlFor="post-categories-select">Categories</Form.Label>
				<AsyncSelect id="posts-categories-select" isMulti placeholder="Select a category" />
			</Form.Group>
			<Form.Group controlId="post-new-categories" className="d-flex">
				<Form.Control type="text" placeholder="New category" size="sm" style={{ width: "fit-content" }} />
				<Button type="button" variant="secondary" size="sm" className="ms-2">
					<FontAwesomeIcon icon="plus" className="me-2" />
					Add
				</Button>
			</Form.Group>
		</>
	);
};

export default CategoriesFields;
