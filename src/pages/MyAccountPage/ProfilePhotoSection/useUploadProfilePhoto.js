import { useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API calls
import { updateUserPhoto } from "../../../apis/users-api";

// Other custom hooks
import useToasts from "../../../hooks/useToasts";

// Custom hook for the upload of a user's profile photo
export default function useUploadProfilePhoto(userId, onUploaded = () => {}) {
  const profilePhotoRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { handleToastAdd } = useToasts();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const photoData = new FormData();
      photoData.append("photo", photo);
      setLoading(true);
      try {
        const uploadedPhoto = await updateUserPhoto(userId, photoData);
        setLoading(false);
        setPhoto(null);
        onUploaded(uploadedPhoto);
        handleToastAdd({
          type: "OPERATION_MESSAGE",
          message: {
            title: (
              <>
                <FontAwesomeIcon icon="check-circle" className="text-success me-3" />
                Upload success
              </>
            ),
            content: <p className="text-success mb-0">Your photo has been updated successfully</p>,
            duration: 5000,
            delay: 3000,
          },
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
        handleToastAdd({
          type: "OPERATION_TOAST",
          message: {
            title: (
              <>
                <FontAwesomeIcon icon="times-error" className="text-danger me-3" />
                Upload error
              </>
            ),
            content: <p className="text-danger mb-0">{error.data.message}</p>,
            duration: 5000,
            delay: 3000,
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photo]
  );

  const handlePhotoChange = useCallback((e) => {
    setPhoto(e.target.files[0]);
  }, []);

  const handlePhotoClose = useCallback(() => {
    setPhoto(null);
  }, []);

  return { isLoading, photo, profilePhotoRef, handleSubmit, handlePhotoChange, handlePhotoClose };
}
