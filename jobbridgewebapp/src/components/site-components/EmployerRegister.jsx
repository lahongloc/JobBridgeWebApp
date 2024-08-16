import React, { useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	Checkbox,
	Row,
	Col,
	Typography,
	Divider,
	Radio,
	Alert,
} from "antd";
import APIs, { enpoints } from "../../configs/APIs";
import { message, Space, Spin } from "antd";

const { Title, Paragraph } = Typography;

const EmployerRegister = () => {
	const [isAgreed, setIsAgreed] = useState(false); // State to track agreement checkbox
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const genders = [
		{
			label: "Nam",
			value: true,
		},
		{
			label: "Nữ",
			value: false,
		},
	];

	const handleFinish = async (values) => {
		setLoading(true);
		let user = values;
		delete values.agreement;
		delete values.confirmPassword;

		try {
			const res = await APIs.post(enpoints["recruiterRegister"], user);
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

	const handleAgreementChange = (e) => {
		setIsAgreed(e.target.checked); // Update state when checkbox value changes
	};

	return (
		<div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
			{/* Khung quy định */}
			{contextHolder}
			<div
				style={{
					marginBottom: "20px",
				}}
			>
				<Alert
					message={<b>Quy định</b>}
					description={
						<>
							<Paragraph>
								Để đảm bảo chất lượng dịch vụ, JobBridge không
								cho phép một người dùng tạo nhiều tài khoản khác
								nhau. Nếu phát hiện vi phạm, JobBridge sẽ ngừng
								cung cấp dịch vụ tới tất cả các tài khoản trùng
								lặp hoặc chặn toàn bộ truy cập tới hệ thống
								website của JobBridge.
							</Paragraph>
							<Paragraph>
								Đối với trường hợp khách hàng đã sử dụng hết 3
								tin tuyển dụng miễn phí, JobBridge hỗ trợ kích
								hoạt đăng tin tuyển dụng không giới hạn sau khi
								quý doanh nghiệp cung cấp thông tin giấy phép
								kinh doanh.
							</Paragraph>
						</>
					}
					type="info"
					showIcon
				/>
			</div>
			{/* Form đăng ký tài khoản */}
			<Form
				layout="vertical"
				onFinish={handleFinish}
				style={{ marginBottom: "20px" }}
			>
				<Title level={4}>Đăng ký tài khoản</Title>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							label="Email đăng nhập"
							name="email"
							rules={[
								{
									required: true,
									type: "email",
									message: "Vui lòng nhập email!",
								},
							]}
						>
							<Input placeholder="Email đăng nhập" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Mật khẩu"
							name="password"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập mật khẩu!",
								},
							]}
						>
							<Input.Password placeholder="Mật khẩu" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Xác nhận mật khẩu"
							name="confirmPassword"
							rules={[
								{
									required: true,
									message: "Vui lòng xác nhận mật khẩu!",
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
							<Input.Password placeholder="Xác nhận mật khẩu" />
						</Form.Item>
					</Col>
				</Row>

				<Divider />

				{/* Form thông tin nhà tuyển dụng */}
				<Title level={4}>Thông tin nhà tuyển dụng</Title>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Họ và tên"
							name="fullname"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập họ và tên!",
								},
							]}
						>
							<Input placeholder="Họ và tên" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Giới tính"
							name="gender"
							rules={[
								{
									required: true,
									message: "Vui lòng chọn giới tính!",
								},
							]}
						>
							<Radio.Group options={genders} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							label="Tên công ty"
							name="companyName"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập tên công ty!",
								},
							]}
						>
							<Input placeholder="Tên công ty" />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							name="agreement"
							valuePropName="checked"
							rules={[
								{
									validator: (_, value) =>
										value
											? Promise.resolve()
											: Promise.reject(
													"Bạn phải đồng ý với điều khoản dịch vụ và chính sách bảo mật!",
												),
								},
							]}
						>
							<Checkbox onChange={handleAgreementChange}>
								Tôi đã đọc và đồng ý với Điều khoản dịch vụ và
								Chính sách bảo mật của JobBridge.
							</Checkbox>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Button
							type="primary"
							htmlType="submit"
							block
							disabled={!isAgreed || loading} // Disable button if not agreed
						>
							Đăng ký
							{loading && <Spin />}
						</Button>
					</Col>
				</Row>
			</Form>

			{/* Hotline */}
			<div style={{ textAlign: "center", marginTop: "20px" }}>
				<Paragraph>
					Mọi thắc mắc vui lòng liên hệ Hotline CSKH: 1900 123 456
				</Paragraph>
			</div>
		</div>
	);
};

export default EmployerRegister;
