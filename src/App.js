import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import IconsImports from "./components/IconsImports";
import AppNavbar from "./components/AppNavbar";
import PostsPage from "./pages/PostsPage";

function App() {
	return (
		<IconsImports>
			<div className="App">
				<Router>
					<AppNavbar />
					<div className="container pt-4 pb-5">
						<Routes>
							<Route path="/" element={<Navigate to="/posts" replace />} />
							<Route path="/posts" element={<PostsPage />} />
						</Routes>
					</div>
				</Router>
			</div>
		</IconsImports>
	);
}

export default App;
