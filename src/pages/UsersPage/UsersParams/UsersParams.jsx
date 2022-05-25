import { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UsersParams = ({ isDisabled = false, order, onOrderChange, onSearchSubmit }) => {
	const [search, setSearch] = useState("");

	const handleSearchSubmit = useCallback(
		(e) => {
			e.preventDefault();
			onSearchSubmit(search);
		},
		[search, onSearchSubmit]
	);

	const handleOrderChange = useCallback((e) => onOrderChange(e.target.value), [onOrderChange]);

	return (
		<div className="d-flex flex-column flex-md-row-reverse justify-content-between align-items-md-center mb-5">
			<Form className="users-search mb-3 mb-md-0" onSubmit={handleSearchSubmit}>
				<div className="d-flex align-items-center">
					<Form.Control
						type="search"
						placeholder="Search users"
						className="me-2"
						disabled={isDisabled}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button type="submit" disabled={isDisabled}>
						<FontAwesomeIcon icon="search" />
					</Button>
				</div>
			</Form>
			<div className="users-filter text-center text-md-left">
				<FontAwesomeIcon icon="clock" className="me-2" />
				<em className="fst-normal fw-bolder text-secondary me-3">Sort:</em>
				<Form.Check
					type="radio"
					inline
					disabled={isDisabled}
					label="Newest"
					id="users-sort-desc"
					name="users-sort"
					value="desc"
					checked={order === "desc"}
					onChange={handleOrderChange}
				/>
				<Form.Check
					type="radio"
					inline
					disabled={isDisabled}
					label="Oldest"
					id="users-sort-asc"
					name="users-sort"
					value="asc"
					checked={order === "asc"}
					onChange={handleOrderChange}
				/>
			</div>
		</div>
	);
};

export default UsersParams;
