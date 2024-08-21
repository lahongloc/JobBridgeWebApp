import React from "react";
import {
	message,
	Card,
	Typography,
	Row,
	Col,
	Input,
	Select,
	Pagination,
	Spin,
	Button,
} from "antd";
import {
	SearchOutlined,
	FilterOutlined,
	EnvironmentOutlined,
	RedoOutlined,
	AppstoreOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import APIs, { enpoints } from "../../configs/APIs";
import JobPostCard from "../ui components/JobPostCard";
import {
	JobFieldContext,
	JobLocationContext,
	UserContext,
	WorkTypeContext,
} from "../../App";
import { paths } from "../../authorizations/paths";

const { Option } = Select;

const Home = () => {
	const [q] = useSearchParams();
	const [user, dispatch] = useContext(UserContext);
	const [messageApi, contextHolder] = message.useMessage();
	const [isLogin, setIsLogin] = useState(q.get("user"));
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [totalElements, setTotalElements] = useState(0);
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({
		jobTitle: "",
		workType: "",
		jobLocation: "",
		jobField: "",
		pageNumber: 1,
	});
	const [currentPage, setCurrentPage] = useState(1);

	const workTypes = useContext(WorkTypeContext);
	const jobFields = useContext(JobFieldContext);
	const jobLocations = useContext(JobLocationContext);

	useEffect(() => {
		fetchJobPosts();
	}, [filters]);

	const fetchJobPosts = async () => {
		console.log("Filters: ", filters);
		setLoading(true);
		try {
			const res = await APIs.post(enpoints["searchJobPost"], filters);
			setData(res.data.result.content);
			setTotalElements(res.data.result.totalElements);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleSearchChange = (e) => {
		setFilters({ ...filters, jobTitle: e.target.value });
	};

	const handleFilterChange = (value, key) => {
		setFilters({ ...filters, [key]: value });
	};

	const handlePageChange = (page) => {
		setFilters({ ...filters, pageNumber: page });
		setCurrentPage(page);
	};

	const handleResetFilters = () => {
		setFilters((prev) => {
			return {
				...prev,
				jobTitle: "",
				workType: "",
				jobLocation: "",
				jobField: "",
			};
		});
	};

	const loginSuccessMessage = () => {
		messageApi.open({
			type: "success",
			content: "Đăng nhập thành công!",
		});
		navigate(paths.home);
	};

	useEffect(() => {
		if (isLogin) loginSuccessMessage();
	}, [isLogin]);

	return (
		<div
			style={{
				width: "80%",
				margin: "0 auto",
				padding: "20px",
				// backgroundColor: "rgb(255 251 230)",
				borderRadius: "16px",
				marginBottom: "5rem",
			}}
		>
			<Row
				gutter={[16, 16]}
				align="middle"
				style={{
					marginBottom: "20px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
					padding: 15,
					borderRadius: "17px",
					backgroundColor: "#fff",
					// margin: "auto",
				}}
			>
				<Col span={8}>
					<Input
						placeholder="Vị trí tuyển dụng"
						value={filters.jobTitle}
						onChange={handleSearchChange}
						prefix={<SearchOutlined />}
					/>
				</Col>
				<Col span={4}>
					<Select
						showSearch
						placeholder="Hình thức làm việc"
						value={filters.workType}
						onChange={(value) =>
							handleFilterChange(value, "workType")
						}
						style={{
							width: "100%",
						}}
						filterOption={(input, option) =>
							option?.children
								?.toString()
								.toLowerCase()
								.includes(input.toLowerCase())
						}
					>
						<Option value="">
							<FilterOutlined /> Hình thức làm việc
						</Option>
						{workTypes.map((type, index) => (
							<Option key={index} value={type.id}>
								{type.name}
							</Option>
						))}
					</Select>
				</Col>
				<Col span={4}>
					<Select
						showSearch
						placeholder="Khu vực tuyển"
						value={filters.jobLocation}
						onChange={(value) =>
							handleFilterChange(value, "jobLocation")
						}
						style={{ width: "100%" }}
						filterOption={(input, option) =>
							option?.children
								?.toString()
								.toLowerCase()
								.includes(input.toLowerCase())
						}
					>
						<Option value="">
							<EnvironmentOutlined /> Khu vực tuyển
						</Option>
						{jobLocations.map((location, index) => (
							<Option key={index} value={location.id}>
								{location.name}
							</Option>
						))}
					</Select>
				</Col>
				<Col span={4}>
					<Select
						showSearch
						placeholder="Ngành nghề/lĩnh vực"
						value={filters.jobField}
						onChange={(value) =>
							handleFilterChange(value, "jobField")
						}
						style={{ width: "100%" }}
						filterOption={(input, option) =>
							option?.children
								?.toString()
								.toLowerCase()
								.includes(input.toLowerCase())
						}
					>
						<Option value="">
							<AppstoreOutlined /> Ngành nghề/lĩnh vực
						</Option>
						{jobFields.map((field, index) => (
							<Option key={index} value={field.id}>
								{field.name}
							</Option>
						))}
					</Select>
				</Col>
				<Col span={2}>
					<Button
						onClick={handleResetFilters}
						icon={<RedoOutlined />}
						type="primary"
					>
						Reset
					</Button>
				</Col>
			</Row>
			{/* <MyCarousel /> */}

			{loading ? (
				<Spin style={{ marginTop: "10rem" }} tip="Loading..." />
			) : (
				<>
					<Row
						justify="start"
						style={{ marginTop: "25px", marginBottom: "20px" }}
					>
						<Col>
							<Pagination
								current={currentPage}
								pageSize={12}
								total={totalElements}
								onChange={handlePageChange}
							/>
						</Col>
					</Row>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: data.length > 2 ? "center" : "",
						}}
					>
						{data.map((jobPost) => {
							return (
								<JobPostCard
									key={jobPost.id}
									jobPost={jobPost}
								/>
							);
						})}
					</div>

					{/* Pagination at the bottom */}
					<Row justify="end" style={{ marginTop: "20px" }}>
						<Col>
							<Pagination
								current={currentPage}
								pageSize={12}
								total={totalElements}
								onChange={handlePageChange}
							/>
						</Col>
					</Row>
				</>
			)}
		</div>
	);
};

export default Home;
