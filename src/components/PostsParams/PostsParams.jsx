import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./PostsParams.css";

const PostsParams = ({ isDisabled = false, order, onOrderChange, onSearchSubmit }) => {
  const [search, setSearch] = useState("");

  // Forcing the search submission when the input is reset
  useEffect(() => {
    !search && onSearchSubmit("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Handles the search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(search);
  };

  return (
    <Form
      className="app-posts-params border border-gray-600 rounded-1 bg-light px-2 py-3 d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center"
      onSubmit={handleSearchSubmit}
    >
      <div className="posts-date-sort pb-3 pb-md-0 text-center text-md-start">
        <span className="text-secondary fw-bolder me-3">
          <FontAwesomeIcon icon="clock" className="me-2" />
          Date:
        </span>
        <Form.Check
          disabled={isDisabled}
          type="radio"
          name="posts-sort"
          label={
            <>
              Recent
              <FontAwesomeIcon icon="sort-down" className="ms-1 position-relative" style={{ top: "-3px" }} />
            </>
          }
          id="posts-sort-desc"
          inline
          checked={order === "desc"}
          onChange={() => onOrderChange("desc")}
        />
        <Form.Check
          disabled={isDisabled}
          type="radio"
          name="posts-sort"
          label={
            <>
              Ancient
              <FontAwesomeIcon icon="sort-up" className="ms-1 position-relative" style={{ top: "3px" }} />
            </>
          }
          id="posts-sort-asc"
          inline
          checked={order === "asc"}
          onChange={() => onOrderChange("asc")}
        />
      </div>
      <div className="posts-search d-flex flex-nowrap justify-content-end">
        <div className="flex-fill me-2">
          <Form.Control
            type="search"
            placeholder="Search a post"
            disabled={isDisabled}
            value={search}
            onChange={(e) => setSearch(() => e.target.value)}
          />
        </div>
        <div>
          <Button type="submit" disabled={isDisabled} variant="primary">
            <FontAwesomeIcon icon="search" />
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default PostsParams;
