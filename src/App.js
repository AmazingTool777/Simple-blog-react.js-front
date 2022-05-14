import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import IconsImports from "./components/IconsImports";
import AppNavbar from "./components/AppNavbar";

function App() {
	return (
		<IconsImports>
			<div className="App">
				<Router>
					<AppNavbar />
				</Router>
			</div>
		</IconsImports>
	);
}

export default App;
