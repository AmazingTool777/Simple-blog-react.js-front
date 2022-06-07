import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import ProfilePhotoSection from "./ProfilePhotoSection";

const MyAccountPage = () => {
  return (
    <section id="my-account-page">
      <h1 className="mb-5">
        <FontAwesomeIcon icon="user" className="me-4" />
        My account
      </h1>
      <ProfilePhotoSection />
    </section>
  );
};

export default MyAccountPage;
