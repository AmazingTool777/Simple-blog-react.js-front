const MainContentLayout = ({ children }) => {
  return (
    <div className="container pt-4 pb-5">
      <main>{children}</main>
    </div>
  );
};

export default MainContentLayout;
