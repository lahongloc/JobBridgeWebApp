import "antd/dist/reset.css";
import RegistrationForm from "./components/site-components/RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import AppFooter from "./layouts/AppFooter";
import { paths } from "./authorizations/paths";
import LoginForm from "./components/site-components/LoginForm";
import { createContext, useReducer } from "react";
import UserReducer from "./reducers/UserReducer";
import cookie from "react-cookies";
import { isLogin } from "./authorizations/roleAuth";

export const UserContext = createContext();

const App = () => {
	const [user, dispatch] = useReducer(
		UserReducer,
		cookie.load("user") || null,
	);

	return (
		<BrowserRouter>
			<UserContext.Provider value={[user, dispatch]} className="App">
				<Navbar />
				<Routes>
					{isLogin(user) || (
						<>
							<Route
								path={paths["user-login"]}
								element={<LoginForm />}
							/>
							<Route
								path={paths["user-register"]}
								element={<RegistrationForm />}
							/>
						</>
					)}
				</Routes>
				<AppFooter />
			</UserContext.Provider>
		</BrowserRouter>
	);
};

export default App;
