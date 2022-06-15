import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useMyAccount from "./useMyAccount";

// Components
import ProfilePhotoSection from "./ProfilePhotoSection";
import PersoInfoSection from "./PersoInfoSection";
import MyAccountPageLoaders from "./MyAccountPageLoaders";
import ModifyPwdSection from "./ModifyPwdSection";

const MyAccountPage = () => {
  const { user, isLoading, hasFetched, handleProfilePhotoUpdated } = useMyAccount();

  return (
    <section id="my-account-page">
      <h1 className="pb-1">
        <FontAwesomeIcon icon="user" className="me-4" />
        My account
      </h1>
      <hr className="mb-5" />
      {isLoading && <MyAccountPageLoaders />}
      {!isLoading && hasFetched && (
        <>
          <ProfilePhotoSection user={user} onPhotoUpdated={handleProfilePhotoUpdated} />
          <PersoInfoSection />
          <ModifyPwdSection />
        </>
      )}
    </section>
  );
};

export default MyAccountPage;
