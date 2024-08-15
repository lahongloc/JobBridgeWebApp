import cookie from "react-cookies";
import { LOGIN, LOGOUT } from "./actions";
import { remove as removeCookie, load } from "react-cookies";
import APIs, { enpoints } from "../configs/APIs";

const signOut = async () => {
	try {
		const res = await APIs.post(
			enpoints["logout"],
			{
				token: cookie.load("token"),
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		await removeCookie("token", {
			path: "/",
			domain: window.location.hostname,
		});
		await removeCookie("user", {
			path: "/",
			domain: window.location.hostname,
		});
	} catch (err) {
		console.error(err);
	}
};

export const UserReducer = (current, action) => {
	switch (action.type) {
		case LOGIN:
			return action.payload;
		case LOGOUT:
			signOut();
			return null;
		default:
			return current;
	}
};

export default UserReducer;
