import { useState, useCallback, useRef, useMemo, useContext, createElement } from "react";

// Styles
import "./PhotoPreview.css";

// Photo preview context
import photoPreviewContext from "../../contexts/photoPreview-context";

// Provider of the photo preview context values
const PhotoPreview = ({ isOpen = false, onFileChange = () => {}, onClose = () => {}, children }) => {
  const fileBtnRef = useRef(null);

  const [previewSrc, setPreviewSrc] = useState("");

  // Opens or closes the photo preview
  const handleClose = useCallback(() => {
    fileBtnRef.current.value = "";
    setPreviewSrc("");
    onClose();
  }, [onClose]);

  // Handles the click of the file input pick triggerer
  const handleTriggerClick = useCallback(() => fileBtnRef.current.click(), []);

  // Handles the change of the file
  const handleFileChange = useCallback(() => {
    const file = fileBtnRef.current.files[0];
    onFileChange(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSrc(reader.result);
  }, [onFileChange]);

  const contextValues = useMemo(
    () => ({
      isOpen,
      previewSrc,
      file: fileBtnRef.current && fileBtnRef.current.files.length > 0 && fileBtnRef.current.files[0],
      handleClose,
      handleFileChange,
      handleTriggerClick,
    }),
    [isOpen, previewSrc, handleClose, handleFileChange, handleTriggerClick]
  );

  return (
    <photoPreviewContext.Provider value={contextValues}>
      <input ref={fileBtnRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />
      {children}
    </photoPreviewContext.Provider>
  );
};

// Component for the actual preview element
const Preview = ({ src, className }) => {
  const { isOpen, previewSrc } = useContext(photoPreviewContext);

  let containerClassName = "app-photo-preview";
  if (className) containerClassName += ` ${className}`;
  if (isOpen && previewSrc) containerClassName += " active";

  if (!src && !previewSrc) return null;

  return (
    <div className={containerClassName}>
      <img src={isOpen && previewSrc ? previewSrc : src} alt="" />
    </div>
  );
};

// Component for the preview closer
const Closer = ({ as: Component, children, ...props }) => {
  const { handleClose } = useContext(photoPreviewContext);
  return createElement(
    Component ? Component : "button",
    {
      type: "button",
      onClick: handleClose,
      ...props,
    },
    children
  );
};

// Component for the file pick trigger
const Trigger = ({ as: Component, children, ...props }) => {
  const { handleTriggerClick } = useContext(photoPreviewContext);
  return createElement(
    Component ? Component : "button",
    {
      type: "button",
      onClick: handleTriggerClick,
      ...props,
    },
    children
  );
};

// Setting the sub-components of the photo preview
PhotoPreview.Preview = Preview;
PhotoPreview.Closer = Closer;
PhotoPreview.Trigger = Trigger;

export default PhotoPreview;
