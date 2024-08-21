import React, { useEffect, useState } from "react";
import {
	Modal,
	Button,
	Table,
	Upload,
	Input,
	Typography,
	Radio,
	message,
} from "antd";
const { Title, Text } = Typography;
import cookie from "react-cookies";
import APIs, { enpoints } from "../../configs/APIs";

const ApplyJobModal = ({ job, isModalVisible, handleCancel }) => {
	const [selectedOption, setSelectedOption] = useState("library"); // 'library' or 'upload'
	const [selectedCV, setSelectedCV] = useState(null);
	const [uploadedFile, setUploadedFile] = useState(null);

	const handleOptionChange = (option) => {
		setSelectedOption(option);
		setSelectedCV(null);
		setUploadedFile(null);
	};

	const handleCVSelection = (cvName) => {
		setSelectedCV(cvName);
	};

	const props = {
		beforeUpload: (file) => {
			const isPdf = file.type === "application/pdf";
			if (!isPdf) {
				message.error("Bạn chỉ có thể upload file PDF!");
			}
			const isLt5MB = file.size / 1024 / 1024 < 5;
			if (!isLt5MB) {
				message.error("File phải có dung lượng không quá 5MB!");
			}
			return isPdf && isLt5MB;
		},
		onChange: (info) => {
			if (info.file.status === "done") {
				setUploadedFile(info.file.originFileObj);
			}
		},
		showUploadList: false,
		customRequest: ({ onSuccess }) => {
			setTimeout(() => {
				onSuccess("ok");
			}, 0);
		},
	};

	const handleSubmit = () => {
		if (selectedOption === "library" && !selectedCV) {
			message.error("Vui lòng chọn một CV từ thư viện.");
			return;
		}

		if (selectedOption === "upload" && !uploadedFile) {
			message.error("Vui lòng tải lên một CV.");
			return;
		}

		const coverLetter = document.getElementById("coverLetter").value;
		if (!coverLetter) {
			message.error("Vui lòng nhập thư ứng tuyển.");
			return;
		}

		const submissionData = {
			jobPost: job.id,
			selectedOption,
			selectedCV,
			uploadedFile,
			coverLetter,
		};

		console.log(submissionData);
		// Proceed with submission logic
		handleCancel(); // Close the modal after successful submission
	};

	const [cvLibraryData, setCvLibraryData] = useState();

	const loadCvsLibrary = async () => {
		// setLoading(true);
		try {
			const res = await APIs.get(enpoints["getCVsByUser"], {
				headers: {
					Authorization: `Bearer ${cookie.load("token")}`,
				},
			});
			console.log("cv: ", res.data.result);
			setCvLibraryData(res.data.result);
		} catch (err) {
			console.error(err);
		} finally {
			// setLoading(false);
		}
	};
	useEffect(() => {
		loadCvsLibrary();
	}, []);

	const columns = [
		{
			title: "",
			dataIndex: "radio",
			key: "radio",
			render: (text, record) => (
				<>
					<Radio
						checked={selectedCV === record.id}
						onChange={() => handleCVSelection(record.id)}
					/>
				</>
			),
		},
		{ title: "", dataIndex: "name", key: "id" },
		{
			title: "",
			key: "action",
			render: (text, record) => (
				<Button type="link" href={record.filePath} target="_blank">
					Xem
				</Button>
			),
		},
	];

	return (
		<Modal
			title={`Ứng tuyển cho vị trí ${job.jobTitle}`}
			open={isModalVisible}
			onCancel={handleCancel}
			footer={[
				<Button key="cancel">Hủy</Button>,
				<Button key="submit" type="primary" onClick={handleSubmit}>
					Nộp hồ sơ ứng tuyển
				</Button>,
			]}
		>
			{/* Choose Option */}
			<div style={{ marginBottom: "20px" }}>
				<Title level={4}>Chọn CV để ứng tuyển</Title>
				<Button
					type={selectedOption === "library" ? "primary" : "default"}
					onClick={() => handleOptionChange("library")}
					style={{ marginRight: "10px" }}
				>
					Chọn CV từ thư viện
				</Button>
				<Button
					type={selectedOption === "upload" ? "primary" : "default"}
					onClick={() => handleOptionChange("upload")}
				>
					Tải CV lên từ máy tính
				</Button>
			</div>

			{/* Conditionally Render CV Library or Upload */}
			{selectedOption === "library" ? (
				<Table
					columns={columns}
					dataSource={cvLibraryData}
					pagination={false}
				/>
			) : (
				<Upload.Dragger
					{...props}
					name="files"
					multiple={false}
					style={{
						backgroundColor: "white",
						border: "dashed 2px #d9d9d9",
						padding: "16px",
						textAlign: "center",
						cursor: "pointer",
						borderRadius: "8px",
					}}
				>
					<p style={{ marginBottom: "12px", fontWeight: "bold" }}>
						Tải lên CV từ máy tính
					</p>
					<p style={{ marginBottom: "8px", color: "#8c8c8c" }}>
						Chọn hoặc kéo thả tệp
					</p>
					<p style={{ color: "#8c8c8c" }}>
						Hỗ trợ định dạng pdf dưới 5MB
					</p>
				</Upload.Dragger>
			)}
			{uploadedFile && (
				<Text
					style={{
						display: "block",
						marginTop: "10px",
						color: "#1890ff",
						fontWeight: "bold",
					}}
				>
					File đã chọn: {uploadedFile.name}
				</Text>
			)}

			{/* Cover Letter */}
			<Title level={4} style={{ marginTop: "20px" }}>
				Thư ứng tuyển
			</Title>
			<Input.TextArea
				id="coverLetter"
				placeholder="Nhập thư ứng tuyển của bạn"
				autoSize={{ minRows: 4, maxRows: 8 }}
				style={{ marginBottom: "20px" }}
			/>

			{/* Lưu ý */}
			<Title level={5}>Lưu ý</Title>
			<Text>
				JobBridge khuyên tất cả các bạn hãy luôn cẩn trọng trong quá
				trình tìm việc và chủ động nghiên cứu về thông tin công ty, vị
				trí việc làm trước khi ứng tuyển.
			</Text>
		</Modal>
	);
};

export default ApplyJobModal;
