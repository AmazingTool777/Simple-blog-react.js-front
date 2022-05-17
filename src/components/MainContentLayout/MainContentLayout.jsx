import { Outlet } from "react-router-dom";

const MainContentLayout = () => {
  return (
    <div className="container pt-4 pb-5">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainContentLayout;
