import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import IconsImports from "./components/IconsImports";
import AppNavbar from "./components/AppNavbar";
import MainContentLayout from "./components/MainContentLayout";
import AuthPagesLayout from "./components/AuthPagesLayout";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import SignupPage from "./pages/SignupPage";

// Styles
import "./App.css";

function App() {
  return (
    <IconsImports>
      <div className="App">
        <Router>
          <AppNavbar />
          <div id="pages-wrapper">
            <Routes>
              <Route path="/" element={<MainContentLayout />}>
                <Route index element={<Navigate to="/posts" replace />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:postId" element={<PostPage />} />
              </Route>
              <Route path="/auth/*" element={<AuthPagesLayout />}>
                <Route path="signup" element={<SignupPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </div>
    </IconsImports>
  );
}

export default App;
