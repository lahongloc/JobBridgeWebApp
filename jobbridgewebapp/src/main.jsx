import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./layouts/Navbar.jsx";
import AppFooter from "./layouts/AppFooter.jsx";

createRoot(document.getElementById("root")).render(
	// <Router>
	// 	<div className="App">
	// 		<Navbar />
	// 	</div>
	<App />,
	// <AppFooter />
	// </Router>,
);
