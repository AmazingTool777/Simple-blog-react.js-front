import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useMyAccount from "./useMyAccount";

// Components
import ProfilePhotoSection from "./ProfilePhotoSection";
import MyAccountPageLoaders from "./MyAccountPageLoaders";

const MyAccountPage = () => {
  const { user, isLoading, hasFetched } = useMyAccount();

  return (
    <section id="my-account-page">
      <h1 className="mb-5">
        <FontAwesomeIcon icon="user" className="me-4" />
        My account
      </h1>
      {isLoading && <MyAccountPageLoaders />}
      {!isLoading && hasFetched && (
        <>
          <ProfilePhotoSection user={user} />
        </>
      )}
    </section>
  );
};

export default MyAccountPage;
