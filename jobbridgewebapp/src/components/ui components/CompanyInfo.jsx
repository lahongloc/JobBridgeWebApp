import React from "react";
import { Typography, Button, Avatar } from "antd";
import { MailOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CompanyInfo = ({ companyInfo }) => {
	return (
		<div
			style={{
				width: "30%",
				height: "max-content",
				border: "2px solid #1890ff",
				borderRadius: "8px",
				backgroundColor: "#fafafa",
				padding: "16px",
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{/* Avatar */}
			<Avatar
				size={100}
				// companyAvatar = "https://s.net.vn/mzFw",
				src={companyInfo.avatar ?? "https://s.net.vn/mzFw"}
				alt="Company Avatar"
				style={{
					marginBottom: "16px",
					padding: 5,
					boxShadow:
						"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
				}}
			/>

			<Title level={4} style={{ color: "#1890ff", marginBottom: "8px" }}>
				{companyInfo.companyName}
			</Title>

			{/* Email liên hệ */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					marginBottom: "16px",
				}}
			>
				<MailOutlined
					style={{ color: "#1890ff", marginRight: "8px" }}
				/>
				<Text>{companyInfo.email}</Text>
			</div>

			{/* Button sửa hồ sơ */}
			<Button
				type="primary"
				icon={<EditOutlined />} // Icon sửa
				style={{
					borderRadius: "8px",
					fontWeight: "bold",
				}}
			>
				Sửa hồ sơ
			</Button>
		</div>
	);
};

export default CompanyInfo;
