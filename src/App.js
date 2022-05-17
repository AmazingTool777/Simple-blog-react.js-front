import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import IconsImports from "./components/IconsImports";
import AppNavbar from "./components/AppNavbar";
import MainContentLayout from "./components/MainContentLayout";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";

// Styles
import "./App.css";

function App() {
  return (
    <IconsImports>
      <div className="App">
        <Router>
          <AppNavbar />
          <div id="pages-wrapper">
            <MainContentLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/posts" replace />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:postId" element={<PostPage />} />
              </Routes>
            </MainContentLayout>
          </div>
        </Router>
      </div>
    </IconsImports>
  );
}

export default App;
