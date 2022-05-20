import { createContext } from "react";

// Context for the photo preview component
const photoPreviewContext = createContext({
  isOpen: false,
  file: null,
  previewSrc: "",
  handleClose: () => {},
  handlePhotoChange: () => {},
  handleTriggerClick: () => {},
});

export default photoPreviewContext;
