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
	getJobPostsByUser: "/jobPosts/get-by-user",
	searchJobPost: "/jobPosts/search-jobPost",
	uploadCV: "/curriculumVitaes/upload",
	getCVsByUser: "/curriculumVitaes/get-cvs-by-user",
	applicationHandler: "/applications",
	curriculumVitaeHandler: "/curriculumVitaes",
};

export default axios.create({
	baseURL: BASE_URL,
});
