import axios from "axios";

export const BASE_URL = "http://localhost:8080/jobbridge";

export const enpoints = {
	userHandler: "/users",
	login: "/auth/log-in",
	logout: "/auth/log-out",
	currentUser: "/users/myInfo",
};

export default axios.create({
	baseURL: BASE_URL,
});
