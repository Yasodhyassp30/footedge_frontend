import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import React, { useState } from "react";
import { FileUploadModalProps } from "../../../types/scoutingTypes";
import "../scouting.css";

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  visible,
  onCancel,
  onUpload,
  skill,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (fileList[0]?.originFileObj && fileList[1]?.originFileObj) {
      formData.append("files", fileList[0].originFileObj);
      formData.append("files", fileList[1].originFileObj);
      if (onUpload) {
        onUpload(formData);
      }
    } else {
      alert("Please select two files to upload");
    }

    setFileList([]);
  };

  const onUploadRequestCancel = () => {
    setFileList([]);
    onCancel();
  };

  return (
    <div className="file-list">
      <Modal
        title={`Upload 2 Skills file for ${skill?.name ?? "processing"}`}
        open={visible}
        onCancel={onUploadRequestCancel}
        footer={[
          <Button key="cancel" onClick={onUploadRequestCancel}>
            Cancel
          </Button>,
          <Button
            className="upload-button"
            key="upload"
            type="primary"
            onClick={handleUpload}
            style={{ backgroundColor: "#1890ff" }}
            disabled={fileList.length !== 2}
          >
            Upload
          </Button>,
        ]}
      >
        <h4>
          <strong>Note: </strong>2 synchronized files are mandatory.
        </h4>
        <Upload
          accept="video/mp4" // Restricts uploads only to .mp4 files
          disabled={fileList.length > 2}
          fileList={fileList}
          onChange={handleFileChange}
          beforeUpload={(file: RcFile) => false} // Prevent auto-uploading
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default FileUploadModal;
