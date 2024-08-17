import React, { useEffect, useState } from "react";
import {
	Card,
	Row,
	Col,
	Button,
	Typography,
	Layout,
	Divider,
	Pagination,
} from "antd";
import APIs, { enpoints } from "../../configs/APIs";
import cookie from "react-cookies";
import JobCard from "../ui components/JobCard";

const { Title } = Typography;
const { Content } = Layout;

const JobList = () => {
	const [jobs, setJobs] = useState([]);
	const [total, setTotal] = useState(0); // Tổng số công việc
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize] = useState(5); // Số công việc mỗi trang

	const loadJobPosts = async (page = 1) => {
		try {
			const res = await APIs.get(
				`${enpoints["getJobPostsByUser"]}/page=${page}&size=${pageSize}`,
				{
					headers: {
						Authorization: `Bearer ${cookie.load("token")}`,
					},
				},
			);

			console.log(res.data.result);
			setJobs(res.data.result.content);
			setTotal(res.data.result.totalElements); // Tổng số công việc từ API
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		loadJobPosts(currentPage);
	}, [currentPage]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<Layout
			style={{
				minHeight: "100vh",
				backgroundColor: "#fff",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				padding: "20px",
			}}
		>
			<Content
				style={{
					width: "90%",
					maxWidth: "1200px",
					backgroundColor: "#fff",
					padding: "20px",
					borderRadius: "8px",
				}}
			>
				<Title level={3} style={{ marginBottom: "24px" }}>
					Danh sách công việc đã đăng tuyển
				</Title>
				<div
					style={{
						textAlign: "center",
						marginTop: "24px",
						marginBottom: "24px",
					}}
				>
					<Pagination
						current={currentPage}
						pageSize={pageSize}
						total={total}
						onChange={handlePageChange}
						showSizeChanger={false} // Không hiển thị thay đổi kích thước trang
					/>
				</div>

				<div style={{ display: "flex" }}>
					<div style={{ width: "70%", marginRight: "2%" }}>
						{jobs.map((job, index) => (
							<JobCard
								key={index} // Thêm key cho mỗi phần tử
								jobTitle={job.jobTitle}
								createdDate={job.createdDate}
								salaryRange={job.salaryRange}
								jobLocation={job.jobLocation.name}
								workType={job.workType.name}
								hiringQuantity={job.hiringQuantity}
							/>
						))}
					</div>

					<div
						style={{
							width: "30%",
							border: "2px solid #1890ff",
							height: "70vh",
							borderRadius: "8px",
							backgroundColor: "#fafafa",
							padding: "16px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{/* Component hiển thị thêm thông tin ở đây */}
						<Title level={4} style={{ color: "#1890ff" }}>
							Thông tin thêm
						</Title>
					</div>
				</div>
				<div
					style={{
						textAlign: "center",
						marginLeft: "30rem",
						marginTop: "25px",
					}}
				>
					<Pagination
						current={currentPage}
						pageSize={pageSize}
						total={total}
						onChange={handlePageChange}
						showSizeChanger={false} // Không hiển thị thay đổi kích thước trang
					/>
				</div>
			</Content>
		</Layout>
	);
};

export default JobList;
