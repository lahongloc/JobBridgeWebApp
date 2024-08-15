import React, { useEffect, useState } from "react";
import { Form, Input, Button, Divider, Flex } from "antd";
import {
	UserOutlined,
	LockOutlined,
	MailOutlined,
	GoogleOutlined,
	FacebookOutlined,
	LinkedinOutlined,
} from "@ant-design/icons";
import { message, Space, Spin } from "antd";
import job_landing from "../../assets/job_landing.jpg";
import APIs, { enpoints } from "../../configs/APIs";

const RegistrationForm = () => {
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	// const [isSuccess, setIsSuccess] = useState(false);
	const onFinish = async (user) => {
		setLoading(true);
		try {
			const res = await APIs.post(enpoints["userHandler"], user);
			if (res.status === 200) {
				messageApi.open({
					type: "success",
					content: "Đăng ký tài khoản thành công!",
				});
			} else {
				messageApi.open({
					type: "error",
					content: "Email đã tồn tại!",
				});
			}
			setLoading(false);
		} catch (err) {
			messageApi.open({
				type: "error",
				content: "Email đã tồn tại!",
			});
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				marginTop: 100,
				justifyContent: "space-betweens",
				alignItems: "center",
				flexWrap: "wrap",
			}}
		>
			{/* Image Container */}
			<div
				style={{
					width: "30%",
					display: "flex",
					alignItems: "center",
					marginLeft: "1rem",
					marginBottom: "5rem",
				}}
			>
				<img width={650} src={job_landing} />
			</div>
			{/* Form and Intro Container */}
			<div
				style={{
					width: "65%",
					padding: "10px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					marginLeft: "3.65rem",
				}}
			>
				{/* Introductory Message */}
				<div
					style={{
						textAlign: "center",
						marginBottom: "20px",
						// color: "#1677ff",
					}}
				>
					<h1>Chào mừng bạn đến với JobBridge</h1>
					<p>
						Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội
						sự nghiệp lý tưởng
					</p>
					{contextHolder}
				</div>

				{/* Registration Form */}
				<Form
					name="register"
					className="registration-form"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					style={{
						maxWidth: 500,
						width: "100%",
						display: "flex",
						flexDirection: "column",
					}} // Increased maxWidth
				>
					<Form.Item
						name="fullname"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập Họ và tên!",
							},
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder="Họ và tên"
							style={{ height: "40px" }}
						/>
					</Form.Item>

					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								type: "email",
								message: "Vui lòng nhập Email hợp lệ!",
							},
						]}
					>
						<Input
							prefix={<MailOutlined />}
							placeholder="Email"
							style={{ height: "40px" }}
						/>
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập Mật khẩu!",
							},
						]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder="Mật khẩu"
							style={{ height: "40px" }}
						/>
					</Form.Item>

					<Form.Item
						name="confirm"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "Vui lòng xác nhận Mật khẩu!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue("password") === value
									) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error(
											"Mật khẩu xác nhận không khớp!",
										),
									);
								},
							}),
						]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder="Xác nhận Mật khẩu"
							style={{ height: "40px" }}
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="registration-form-button"
							block
							style={{ height: "40px", fontSize: "16px" }}
							disabled={loading}
						>
							Đăng Ký
							{loading && <Spin />}
						</Button>
					</Form.Item>

					<Divider>Hoặc</Divider>

					<Form.Item>
						<Button
							icon={<GoogleOutlined />}
							style={{
								marginBottom: 8,
								height: "40px",
								fontSize: "16px",
							}}
							block
						>
							Đăng nhập bằng Google
						</Button>
						<Button
							icon={<FacebookOutlined />}
							style={{
								marginBottom: 8,
								backgroundColor: "#3b5998",
								color: "#fff",
								height: "40px",
								fontSize: "16px",
							}}
							block
						>
							Đăng nhập bằng Facebook
						</Button>
					</Form.Item>

					<Form.Item style={{ textAlign: "center" }}>
						Đã có tài khoản? <a href="#">Đăng nhập</a>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default RegistrationForm;
