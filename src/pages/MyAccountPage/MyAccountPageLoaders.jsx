import ContentLoader from "react-content-loader";

// Loaders for the current user's page
const MyAccountPageLoaders = (props) => {
  return (
    <ContentLoader viewBox="0 0 260 160" style={{ maxWidth: "500px" }} {...props}>
      <circle cx="50" cy="30" r="30" />
      <rect x="10" y="70" rx="3" ry="3" width="40" height="10" />
      <rect x="60" y="70" rx="3" ry="3" width="70" height="10" />
      <rect x="140" y="70" rx="3" ry="3" width="20" height="10" />
      <rect x="10" y="90" rx="3" ry="3" width="90" height="10" />
      <rect x="110" y="90" rx="3" ry="3" width="70" height="10" />
      <rect x="10" y="110" rx="3" ry="3" width="70" height="10" />
      <rect x="90" y="110" rx="3" ry="3" width="60" height="10" />
    </ContentLoader>
  );
};

export default MyAccountPageLoaders;
