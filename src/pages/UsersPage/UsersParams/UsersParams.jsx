import { useCallback } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import AppSearch from "../../../components/AppSearch";

const UsersParams = ({ isDisabled = false, order, onOrderChange, onSearchSubmit }) => {
  const handleOrderChange = useCallback((e) => onOrderChange(e.target.value), [onOrderChange]);

  return (
    <div className="d-flex flex-column flex-md-row-reverse justify-content-between align-items-md-center mb-5">
      <AppSearch isDisabled={isDisabled} placeholder="Search users" onSearchSubmit={onSearchSubmit} />
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
