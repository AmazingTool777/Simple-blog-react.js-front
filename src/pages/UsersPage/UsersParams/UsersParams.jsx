import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UsersParams = () => {
	return (
		<div className="d-flex flex-column-reverse mb-5">
			<div className="users-filter">
				<FontAwesomeIcon icon="clock" className="me-2" />
				<em className="fst-normal fw-bolder text-secondary me-3">Sort:</em>
				<Form.Check type="radio" name="users-sort" label="Newest" inline />
				<Form.Check type="radio" name="users-sort" label="Oldest" inline />
			</div>
			<Form className="users-search mb-3">
				<div className="d-flex align-items-center">
					<Form.Control type="search" placeholder="Search users" className="me-2" />
					<Button type="submit">
						<FontAwesomeIcon icon="search" />
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default UsersParams;
