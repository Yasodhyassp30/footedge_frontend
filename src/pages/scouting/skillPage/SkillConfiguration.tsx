import { Button, Form, Input, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  COPY,
  CREATE,
  DELETE,
  EDIT,
  SCOUTING_SERVICE_URL,
  SKILL_CARD_MENU_ACTIONS,
  SKILL_CATEGORIES,
} from "../../../constants/scoutingConstants";
import { Skill } from "../../../types/scoutingTypes";
import FileUploadModal from "../common/uploadVideo";
import "../scouting.css";
import {
  createData,
  deleteData,
  fetchData,
  updateData,
  uploadFiles,
} from "../scoutingApis";
import SkillList from "./SkillList";

const { Option } = Select;

const SkillConfiguration: React.FC = () => {
  const [form] = Form.useForm();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isNotEditable, setIsNotEditable] = useState<boolean>(false);
  const [actionType, setActionType] = useState<number>(0);
  const [uploadModalRequest, setUploadModalRequest] = useState<Skill>();

  useEffect(() => {
    setLoading(true);
    if (!uploadModalRequest) {
      const callAPI = async () => {
        const url = `${SCOUTING_SERVICE_URL}/skills`;
        const result = await fetchData(url);
        setSkills(result);
      };

      callAPI();
    }
    setLoading(false);
  }, [uploadModalRequest]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const trimmedName = values.name.trim();
      const categoryId = values.category;
      if (categoryId) {
        const commonSkillObj = {
          alias: values.alias.trim(),
          category: categoryId,
          description: values.description.trim(),
          additional_info: values.additional_info,
        };

        if ([CREATE, COPY].includes(actionType)) {
          const newSkillObj = {
            ...commonSkillObj,
            name: trimmedName,
          };
          const url = `${SCOUTING_SERVICE_URL}/skills`;
          const result: Skill[] = await createData(newSkillObj, url);
          setSkills((prevSkills) => [...prevSkills, ...result]);
        } else if (actionType === EDIT) {
          const url = `${SCOUTING_SERVICE_URL}/skills/${trimmedName}`;
          const result: Skill[] = await updateData(commonSkillObj, url);
          setSkills((prevSkills) => {
            return [
              ...prevSkills.filter((skill) => skill.name !== trimmedName),
              ...result,
            ];
          });
        } else if (actionType === DELETE) {
          const url = `${SCOUTING_SERVICE_URL}/skills/${trimmedName}`;
          const result = await deleteData(trimmedName, url);
          if (result.length > 0) {
            setSkills((prevSkills) =>
              prevSkills.filter((skill) => skill.name !== trimmedName)
            );
          }
        }
      } else {
        alert(categoryId);
      }
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      setLoading(false);
      setIsNotEditable(false);
      form.resetFields();
    }
  };

  const validateSkillName = (_: any, value: string) => {
    if (
      new Set(skills.map((skill) => skill.name)).has(value) &&
      actionType === CREATE
    ) {
      return Promise.reject(
        new Error("Skill name already exists. Please use a different name.")
      );
    }
    return Promise.resolve();
  };

  const onAction = (type: number, skill: Skill) => {
    form.resetFields();
    setIsNotEditable(false);
    setActionType(type);
    if (type === EDIT) {
      form.setFieldsValue({
        name: skill.name,
      });
    }
    if (type === DELETE) {
      form.setFieldsValue({
        name: skill.name,
      });
      setIsNotEditable(true);
    }
    form.setFieldsValue({
      category: skill.category,
      alias: skill.alias,
      description: skill.description,
      additional_info: skill.additional_info,
    });
  };

  const onUpload = async (formData: FormData) => {
    try {
      setLoading(true);
      const url = `${SCOUTING_SERVICE_URL}/files`;
      await uploadFiles(formData, uploadModalRequest, url, 'TRAINING');
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setLoading(false);
      setUploadModalRequest(undefined);
    }
  };

  const onUploadRequest = (skill: Skill) => {
    setUploadModalRequest(skill);
  };

  const onUploadModelClose = () => {
    setUploadModalRequest(undefined);
  };

  const onCancel = () => {
    form.resetFields();
    setIsNotEditable(false);
    setActionType(0);
  };

  return (
    <Spin spinning={loading}>
      <div className="skill-configuration-container">
        <div className="skill-form">
          <h1 className="form-title">Add a New Skill</h1>
          <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter skill name" },
                { validator: validateSkillName },
              ]}
            >
              <Input
                placeholder="Enter skill name"
                disabled={isNotEditable || actionType === EDIT}
              />
            </Form.Item>
            <Form.Item name="alias" label="Alias">
              <Input placeholder="Enter alias" disabled={isNotEditable} />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select placeholder="Select category" disabled={isNotEditable}>
                {Object.keys(SKILL_CATEGORIES).map((key) => (
                  <Option value={parseInt(key)} key={parseInt(key)}>
                    {SKILL_CATEGORIES[parseInt(key)]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea
                placeholder="Enter description"
                disabled={isNotEditable}
              />
            </Form.Item>
            <Form.Item name="additional_info" label="Additional Info">
              <Input.TextArea
                placeholder="Enter additional info"
                disabled={isNotEditable}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="custom-button">
              {SKILL_CARD_MENU_ACTIONS[actionType]} Skill
            </Button>
            <Button
              type="primary"
              htmlType="reset"
              className="custom-button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Form>
        </div>
        <SkillList
          skills={skills}
          loading={loading}
          onAction={onAction}
          onUploadRequest={onUploadRequest}
        />
        <FileUploadModal
          visible={!!uploadModalRequest}
          onCancel={onUploadModelClose}
          onUpload={onUpload}
          skill={uploadModalRequest}
        />
      </div>
    </Spin>
  );
};

export default SkillConfiguration;
