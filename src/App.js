import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Contexts
import currentUserContext from "./contexts/currentUser-context";

// Components
import AppPreloader from "./components/AppPreloader";
import CurrentUserProvider from "./components/CurrentUserProvider";
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
    <CurrentUserProvider>
      <currentUserContext.Consumer>
        {({ initialSetupIsDone }) =>
          !initialSetupIsDone ? (
            <AppPreloader />
          ) : (
            <IconsImports>
              <Router>
                <div className="App">
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
                </div>
              </Router>
            </IconsImports>
          )
        }
      </currentUserContext.Consumer>
    </CurrentUserProvider>
  );
}

export default App;
