import Form from "react-bootstrap/Form";

const ToggleableInput = ({
  type = "text",
  name,
  placeholder = "",
  defaultValue = "",
  value = "",
  isOpen = false,
  error,
  isTouched,
  onChange = () => {},
  ...props
}) => {
  return isOpen ? (
    <>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        isInvalid={isTouched && !!error}
        onChange={onChange}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </>
  ) : (
    <p className="mb-0" style={{ fontWeight: "600" }}>
      {defaultValue}
    </p>
  );
};

export default ToggleableInput;
