import axios from "axios";

export const BASE_URL = "http://localhost:8080/jobbridge";

export const enpoints = {
	userHandler: "/users",
	applicantRegister: "/users/create-applicant",
	recruiterRegister: "/users/create-recruiter",
	login: "/auth/log-in",
	logout: "/auth/log-out",
	currentUser: "/users/myInfo",
	workTypesHandler: "/workTypes",
	jobFieldsHandler: "/jobFields",
	jobLocationsHandler: "/jobLocations",
	jobPostHandlder: "/jobPosts",
};

export default axios.create({
	baseURL: BASE_URL,
});
