import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import React, { useState } from "react";
import { FileUploadModalProps } from "../../../types/scoutingTypes";

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  visible,
  onCancel,
  onUpload,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file: UploadFile) => {
      if (file.originFileObj) {
        formData.append("file", file.originFileObj);
      }
    });

    if (onUpload) {
      onUpload(formData);
    }
    setFileList([]);
  };

  const onUploadRequestCancel = () => {
    setFileList([]);
    onCancel();
  }

  return (
    <Modal
      title="Upload File"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onUploadRequestCancel}>
          Cancel
        </Button>,
        <Button
          key="upload"
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
        >
          Upload
        </Button>,
      ]}
    >
      <Upload
        accept="video/mp4" // Restricts uploads only to .mp4 files
        disabled={fileList.length > 0}
        fileList={fileList}
        onChange={handleFileChange}
        beforeUpload={(file: RcFile) => false} // Prevent auto-uploading
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </Modal>
  );
};

export default FileUploadModal;
