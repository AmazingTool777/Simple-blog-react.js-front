import { useState, useRef, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./ProfilePhotoSection.css";

// Components
import UserAvatar from "../../../components/UserAvatar";
import PhotoPreview from "../../../components/PhotoPreview";

const ProfilePhotoSection = ({ user }) => {
  const profilePhotoRef = useRef(null);

  const [isOpen, setOpen] = useState(false);

  const ALT = `${user.fisrtName} ${user.lastName}'s profile photo`;

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <section>
      <h2 className="fs-3 mb-4">Profile photo</h2>
      <PhotoPreview ref={profilePhotoRef} isOpen={isOpen} onClose={handleClose}>
        <div className="d-flex">
          <div id="current-user-avatar-wrapper" className="me-3">
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
            <Button type="button" variant="primary">
              Confirm
            </Button>
            <PhotoPreview.Closer as={Button} type="button" variant="outline-secondary" className="ms-3">
              Cancel
            </PhotoPreview.Closer>
          </div>
        )}
      </PhotoPreview>
    </section>
  );
};

export default ProfilePhotoSection;
