import ContentLoader from "react-content-loader";

const PostPreviewCardLoaders = () => {
  return (
    <ContentLoader style={{ width: "100%", maxWidth: "310px" }} className="mb-4" viewBox="0 0 180 130">
      <rect x="0" y="0" width="180" height="100" rx="3" ry="3" />
      <rect x="0" y="114" width="100" height="16" rx="8" ry="8" />
    </ContentLoader>
  );
};

export default PostPreviewCardLoaders;
