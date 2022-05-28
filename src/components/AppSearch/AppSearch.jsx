import { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppSearch = ({
  isDisabled,
  placeholder = "",
  formClassName = "",
  containerClassName = "",
  inputClassName = "",
  buttonClassName = "",
  onSearchSubmit,
}) => {
  const [search, setSearch] = useState("");

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSearchSubmit(search);
    },
    [search, onSearchSubmit]
  );

  /* Automatic submission on input clear */
  useEffect(() => {
    if (!search) onSearchSubmit(search);
  }, [search, onSearchSubmit]);

  let _formClassName = "mb-3 mb-md-0";
  if (formClassName) _formClassName += ` ${formClassName}`;

  let _containerClassName = "d-flex align-items-center";
  if (containerClassName) _containerClassName += ` ${containerClassName}`;

  let _inputClassName = "me-2";
  if (inputClassName) _inputClassName += ` ${inputClassName}`;

  return (
    <Form className={_formClassName} onSubmit={handleSearchSubmit}>
      <div className={_containerClassName}>
        <Form.Control
          type="search"
          placeholder={placeholder}
          className={_inputClassName}
          disabled={isDisabled}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" disabled={isDisabled} className={buttonClassName}>
          <FontAwesomeIcon icon="search" />
        </Button>
      </div>
    </Form>
  );
};

export default AppSearch;
