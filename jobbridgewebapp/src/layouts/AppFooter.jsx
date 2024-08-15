import React from "react";
import { Layout, Typography, Space, Divider, Input, Button } from "antd";
import {
	FacebookOutlined,
	TwitterOutlined,
	LinkedinOutlined,
	GithubOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;
const { Search } = Input;

const AppFooter = () => {
	return (
		<Footer
			style={{
				backgroundColor: "#f0f2f5",
				color: "#000",
				padding: "40px 20px",
				textAlign: "center",
			}}
		>
			<div style={{ maxWidth: "1200px", margin: "0 auto" }}>
				{/* Company Information */}
				<Title level={3} style={{ color: "#000" }}>
					JobBridge
				</Title>
				{/* <Text style={{ display: 'block', marginBottom: '20px', color: '#555' }}>
          JobBridge là cổng thông tin giúp bạn tìm kiếm những cơ hội việc làm tốt nhất và kết nối với các nhà tuyển dụng hàng đầu. Tiếp thêm sức mạnh cho sự nghiệp của bạn, từng bước một.
        </Text> */}

				{/* Newsletter Signup */}
				<Space direction="vertical" style={{ marginBottom: "5px" }}>
					<Text>
						JobBridge là cổng thông tin giúp bạn tìm kiếm những cơ
						hội việc làm tốt nhất và kết nối với các nhà tuyển dụng
						hàng đầu
					</Text>
					<Text>
						Đăng ký nhận bản tin của chúng tôi để cập nhật những cơ
						hội việc làm mới nhất và các mẹo phát triển sự nghiệp:
					</Text>
					<Search
						placeholder="Nhập email của bạn"
						enterButton="Đăng ký"
						size="large"
						style={{ maxWidth: 400, marginTop: 5 }}
						onSearch={(value) =>
							console.log("Newsletter subscription:", value)
						}
					/>
				</Space>

				{/* Social Media Links */}
				<Space style={{ marginBottom: "5px" }}>
					<Link
						href="#"
						icon={
							<FacebookOutlined
								style={{ color: "#4267B2", fontSize: "24px" }}
							/>
						}
					/>
					<Link
						href="#"
						icon={
							<TwitterOutlined
								style={{ color: "#1DA1F2", fontSize: "24px" }}
							/>
						}
					/>
					<Link
						href="#"
						icon={
							<LinkedinOutlined
								style={{ color: "#0077B5", fontSize: "24px" }}
							/>
						}
					/>
					<Link
						href="#"
						icon={
							<GithubOutlined
								style={{ color: "#333", fontSize: "24px" }}
							/>
						}
					/>
				</Space>

				{/* Contact Information */}
				<Divider style={{ borderColor: "#d9d9d9" }} />
				<Text style={{ color: "#555" }}>
					© {new Date().getFullYear()} JobBridge. All rights
					reserved.
				</Text>
				<div style={{ marginTop: "10px" }}>
					<Text>Address: 123 Job Street, Career City, CC 45678</Text>
					<br />
					<Text>
						Email: contact@jobbridge.com | Phone: +123 456 7890
					</Text>
				</div>
			</div>
		</Footer>
	);
};

export default AppFooter;
