import { useState, useCallback, useMemo, useContext, createElement, forwardRef } from "react";

// Styles
import "./PhotoPreview.css";

// Photo preview context
import photoPreviewContext from "../../contexts/photoPreview-context";

// Provider of the photo preview context values
const PhotoPreview = forwardRef(
  ({ isOpen = false, name = "photo", onFileChange = () => {}, onClose = () => {}, children }, ref) => {
    const [previewSrc, setPreviewSrc] = useState("");

    // Opens or closes the photo preview
    const handleClose = useCallback(() => {
      ref.current.value = "";
      setPreviewSrc("");
      onClose();
    }, [onClose, ref]);

    // Handles the click of the file input pick triggerer
    const handleTriggerClick = useCallback(() => ref.current.click(), [ref]);

    // Handles the change of the file
    const handleFileChange = useCallback(
      (e) => {
        const file = ref.current.files[0];
        onFileChange(e);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setPreviewSrc(reader.result);
      },
      [onFileChange, ref]
    );

    const contextValues = useMemo(
      () => ({
        isOpen,
        previewSrc,
        file: ref.current && ref.current.files.length > 0 && ref.current.files[0],
        handleClose,
        handleFileChange,
        handleTriggerClick,
      }),
      [isOpen, previewSrc, handleClose, handleFileChange, handleTriggerClick, ref]
    );

    return (
      <photoPreviewContext.Provider value={contextValues}>
        <input ref={ref} type="file" name={name} style={{ display: "none" }} onChange={handleFileChange} />
        {children}
      </photoPreviewContext.Provider>
    );
  }
);

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
