import { Outlet } from "react-router-dom";

// Styles
import "./AuthPagesLayout.css";

const AuthPagesLayout = () => {
  return (
    <div id="auth-pages-layout">
      <Outlet />
    </div>
  );
};

export default AuthPagesLayout;
