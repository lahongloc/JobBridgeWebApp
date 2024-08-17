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
import Home from "./components/site-components/Home";
import EmployerRegister from "./components/site-components/EmployerRegister";
import JobPostingForm from "./components/site-components/JobPostingForm";
import JobList from "./components/site-components/JobList";

export const UserContext = createContext();

const App = () => {
	const [user, dispatch] = useReducer(
		UserReducer,
		cookie.load("user") || null,
	);

	return (
		<BrowserRouter>
			<UserContext.Provider value={[user, dispatch]} className="App">
				<div style={{ marginBottom: "5rem" }}>
					<Navbar />
				</div>
				<Routes>
					{isLogin(user) || (
						<>
							<Route
								path={paths["user-login"]}
								element={<LoginForm />}
							/>
							<Route
								path={paths["applicant-register"]}
								element={<RegistrationForm />}
							/>
						</>
					)}
					<Route path={paths["posted-jobs"]} element={<JobList />} />
					<Route path={paths.home} element={<Home />} />
					<Route
						path={paths["employer-register"]}
						element={<EmployerRegister />}
					/>
					<Route
						path={paths["job-posting"]}
						element={<JobPostingForm />}
					/>
				</Routes>

				<AppFooter />
			</UserContext.Provider>
		</BrowserRouter>
	);
};

export default App;
