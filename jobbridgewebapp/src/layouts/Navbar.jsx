import { Menu, Dropdown, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { paths } from "../authorizations/paths";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { isLogin } from "../authorizations/roleAuth";
import UserAvatar from "../components/ui components/UserAvatar";

const Navbar = () => {
	const navigate = useNavigate();
	const [user, dispatch] = useContext(UserContext);
	useEffect(() => {
		console.log("jusu: ", user);
	});

	const menuItems = [
		{
			key: "jobs",
			label: "Việc làm",
			items: [
				{ key: "1", label: "Tìm việc", link: "/jobs/search" },
				{
					key: "2",
					label: "Việc làm theo ngành nghề",
					link: "/jobs/industry",
				},
				{
					key: "3",
					label: "Việc làm theo địa điểm",
					link: "/jobs/location",
				},
			],
		},
		{
			key: "resume",
			label: "Hồ sơ & CV",
			items: [
				{ key: "1", label: "Tạo CV mới", link: "/resume/create" },
				{ key: "2", label: "Xem Hồ sơ", link: "/resume/view" },
			],
		},
		{
			key: "company",
			label: "Công ty",
			items: [
				{
					key: "1",
					label: "Danh sách công ty",
					link: "/company/list",
				},
				{
					key: "2",
					label: "Công ty nổi bật",
					link: "/company/highlights",
				},
			],
		},
		{
			key: "tools",
			label: "Công cụ",
			items: [
				{ key: "1", label: "Tính lương", link: "/tools/salary" },
				{
					key: "2",
					label: "Ước tính thuế thu nhập",
					link: "/tools/tax",
				},
			],
		},
		{
			key: "career",
			label: "Cẩm nang nghề nghiệp",
			items: [
				{ key: "1", label: "Mẹo tìm việc", link: "/career/tips" },
				{
					key: "2",
					label: "Hướng dẫn viết CV",
					link: "/career/guide",
				},
			],
		},
	];

	// Handle menu item click
	const handleMenuClick = (link) => {
		navigate(link);
	};

	// Dropdown menu generator
	const renderDropdown = (menu, index) => (
		<Dropdown
			key={index}
			overlay={
				<Menu>
					{menu.items.map((item) => (
						<Menu.Item
							key={item.key}
							onClick={() => handleMenuClick(item.link)}
						>
							{item.label}
						</Menu.Item>
					))}
				</Menu>
			}
			trigger={["hover"]}
		>
			<Button
				type="link"
				style={{
					fontWeight: "bold",
					fontSize: "15px",
					color: "black",
				}}
			>
				{menu.label}
			</Button>
		</Dropdown>
	);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "10px 20px",
				backgroundColor: "#fff",
				borderBottom: "1px solid #f0f0f0",
				position: "fixed",
				top: "0",
				left: "0",
				right: "0",
				zIndex: "1000", // Ensure the navbar is above other content
				marginBottom: "20px", // Adds space below the navbar
				boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
			}}
		>
			{/* Logo bên trái */}
			<div style={{ display: "flex", alignItems: "center" }}>
				<img
					onClick={() => navigate(paths.home)}
					src={logo}
					alt="Logo"
					style={{
						height: "40px",
						marginRight: "20px",
						cursor: "pointer",
					}}
				/>
			</div>

			<Space>
				{menuItems.map((menu, index) => renderDropdown(menu, index))}
			</Space>

			<Space>
				{isLogin(user) || (
					<>
						<Button
							type="default"
							onClick={() => navigate(paths["user-login"])}
							style={{ fontWeight: "bold", fontSize: "15px" }}
						>
							Đăng nhập
						</Button>
						<Button
							type="primary"
							onClick={() => navigate(paths["user-register"])}
							style={{ fontWeight: "bold", fontSize: "15px" }}
						>
							Đăng ký
						</Button>
					</>
				)}
				{isLogin(user) && (
					<>
						<UserAvatar />
					</>
				)}
			</Space>
		</div>
	);
};

export default Navbar;
