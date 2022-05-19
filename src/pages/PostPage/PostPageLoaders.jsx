import ContentLoader, { Instagram } from "react-content-loader";

// Loader for the main content
const PostPageLoaders = () => <Instagram style={{ maxWidth: "800px" }} />;

// Loader for the post title in the breadcrumb
const PostTitleLoader = () => (
  <ContentLoader style={{ width: "150px", height: "21px" }} viewBox="0 0 150 21">
    <rect x={0} y={0} width={151} height={21} rx="10" ry="10" />
  </ContentLoader>
);

export default PostPageLoaders;
export { PostTitleLoader };
