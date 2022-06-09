import { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./ProfilePhotoSection.css";

// Custom hooks
import useUploadProfilePhoto from "./useUploadProfilePhoto";

// Components
import UserAvatar from "../../../components/UserAvatar";
import PhotoPreview from "../../../components/PhotoPreview";

const ProfilePhotoSection = ({ user, onPhotoUpdated }) => {
  const [isOpen, setOpen] = useState(false);

  const handlePhotoUpdated = useCallback(
    (updatedPhoto) => {
      setOpen(false);
      onPhotoUpdated(updatedPhoto);
    },
    [onPhotoUpdated]
  );

  const { photo, isLoading, profilePhotoRef, handleSubmit, handlePhotoChange, handlePhotoClose } =
    useUploadProfilePhoto(user._id, handlePhotoUpdated);

  const handleClose = useCallback(() => {
    setOpen(false);
    handlePhotoClose();
  }, [handlePhotoClose]);

  const photoIsSelected = !!profilePhotoRef.current && !!profilePhotoRef.current.files[0];

  const ALT = `${user.fisrtName} ${user.lastName}'s profile photo`;

  return (
    <section>
      <h2 className="fs-3 mb-4">Profile photo</h2>
      <form onSubmit={handleSubmit}>
        <PhotoPreview ref={profilePhotoRef} isOpen={isOpen} onClose={handleClose} onFileChange={handlePhotoChange}>
          <div className="d-flex">
            <div
              id="current-user-avatar-wrapper"
              className="me-3"
              style={{ display: isOpen && !photoIsSelected && !user.photoURL ? "none" : "block" }}
            >
              {!isOpen && <UserAvatar id="current-user-avatar" src={user.photoURL} gender={user.gender} alt={ALT} />}
              {isOpen && <PhotoPreview.Preview className="current-user-avatar-preview" src={user.photoURL} />}
            </div>
            <div>
              {!isOpen && (
                <Button type="button" variant="warning" onClick={() => setOpen(true)}>
                  <FontAwesomeIcon icon="pen-square" className="me-2" />
                  Edit profile photo
                </Button>
              )}
              {isOpen && (
                <PhotoPreview.Trigger as={Button} variant="secondary" type="button">
                  <FontAwesomeIcon icon="file-image" className="me-2" />
                  Pick a photo
                </PhotoPreview.Trigger>
              )}
            </div>
          </div>
          {isOpen && (
            <div className="d-flex mt-3">
              <Button disabled={isLoading || !photo} type="submit" variant="primary">
                Confirm
                {isLoading && <Spinner className="ms-2" animation="border" variant="light" size="sm" />}
              </Button>
              <PhotoPreview.Closer as={Button} type="button" variant="outline-secondary" className="ms-3">
                Cancel
              </PhotoPreview.Closer>
            </div>
          )}
        </PhotoPreview>
      </form>
    </section>
  );
};

export default ProfilePhotoSection;
