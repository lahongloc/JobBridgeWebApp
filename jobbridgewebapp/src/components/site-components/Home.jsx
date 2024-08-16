import { useNavigate, useSearchParams } from "react-router-dom";
import { message, Space, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { paths } from "../../authorizations/paths";
import { UserContext } from "../../App";

const Home = () => {
	const [q] = useSearchParams();
	const [user, dispatch] = useContext(UserContext);
	const [messageApi, contextHolder] = message.useMessage();
	const [isLogin, setIsLogin] = useState(q.get("user"));
	const navigate = useNavigate();

	useEffect(() => {
		console.log("user la: ", user);
	});

	const loginSuccessMessage = () => {
		messageApi.open({
			type: "success",
			content: "Đăng nhập thành công!",
		});
		navigate(paths.home);
	};
	useEffect(() => {
		if (isLogin) loginSuccessMessage();
	}, []);

	return (
		<>
			{contextHolder}
			<h1>THiss is home</h1>
			<h2>Hello !</h2>
		</>
	);
};

export default Home;
