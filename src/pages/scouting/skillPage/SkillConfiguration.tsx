import { Button, Card, Form, Input, Select, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  COPY,
  CREATE,
  DELETE,
  EDIT,
  SCOUTING_SERVICE_URL,
  SKILL_CARD_MENU_ACTIONS,
  SKILL_CATEGORIES
} from "../../../constants/scoutingConstants";
import { Skill } from "../../../types/scoutingTypes";
import CustomOption from "../common/CustomOption";
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

  const loadSkills = useCallback(async () => {
    setLoading(true);
    try {
      const url = `${SCOUTING_SERVICE_URL}/skills`;
      const result = await fetchData(url);
      setSkills(result);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!uploadModalRequest) {
      loadSkills();
    }
  }, [loadSkills, uploadModalRequest]);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const { name, alias, category, description, additional_info, linked_player } = values;
      const commonSkillObj = {
        alias: alias.trim(),
        category,
        description: description.trim(),
        additional_info,
        linked_player
      };

      const url = `${SCOUTING_SERVICE_URL}/skills`;
      let result: Skill[] = [];

      if ([CREATE, COPY].includes(actionType)) {
        result = await createData(
          { ...commonSkillObj, name: name.trim() },
          url
        );
        setSkills((prevSkills) => [...prevSkills, ...result]);
      } else if (actionType === EDIT) {
        result = await updateData(commonSkillObj, `${url}/${name.trim()}`);
        setSkills((prevSkills) =>
          prevSkills.map((skill) => (skill.name === name ? result[0] : skill))
        );
      } else if (actionType === DELETE) {
        await deleteData(name.trim(), `${url}/${name.trim()}`);
        setSkills((prevSkills) =>
          prevSkills.filter((skill) => skill.name !== name.trim())
        );
      }
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      setLoading(false);
      setIsNotEditable(false);
      form.resetFields();
      setActionType(0)
    }
  };

  const validateSkillName = (_: any, value: string) => {
    if (skills.some((skill) => skill.name === value) && actionType === CREATE) {
      return Promise.reject(
        new Error("Skill name already exists. Please use a different name.")
      );
    }
    return Promise.resolve();
  };

  const handleAction = (type: number, skill: Skill) => {
    form.resetFields();
    setIsNotEditable(type === DELETE);
    setActionType(type);
    form.setFieldsValue({ ...skill, name: skill.name });
  };

  const handleUpload = async (formData: FormData) => {
    try {
      setLoading(true);
      const url = `${SCOUTING_SERVICE_URL}/files`;
      await uploadFiles(formData, uploadModalRequest, undefined, url, "TRAINING");
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setLoading(false);
      setUploadModalRequest(undefined);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsNotEditable(false);
    setActionType(0);
  };

  return (
    <Spin spinning={loading}>
      <div className="skill-configuration-container">
        <div className="skill-form">
          <Card className="skill-card-view" title="Skill Configuration">
            <Form form={form} onFinish={handleFinish} layout="vertical">
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
                <Select
                  placeholder="Select category"
                  disabled={isNotEditable}
                  className="icon-select"
                >
                  {Object.keys(SKILL_CATEGORIES).map((key) => {
                    const category = parseInt(key);
                    const categoryName = SKILL_CATEGORIES[category];
                    const imageURL = ""; // Add logic to get the image URL if available

                    return (
                      <Option value={category} key={key}>
                        <div className="option-content">
                          <CustomOption
                            imageURL={imageURL}
                            categoryName={categoryName}
                            categoryValue={category}
                          />
                        </div>
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter description" },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter description"
                  disabled={isNotEditable}
                />
              </Form.Item>
              <div className="form-button-container">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="skill-custom-button"
                >
                  {SKILL_CARD_MENU_ACTIONS[actionType]} Skill
                </Button>
                <Button
                  type="primary"
                  className="skill-custom-button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card>
        </div>
        <SkillList
          skills={skills}
          loading={loading}
          onAction={handleAction}
          onUploadRequest={setUploadModalRequest}
        />
        <FileUploadModal
          visible={!!uploadModalRequest}
          onCancel={() => setUploadModalRequest(undefined)}
          onUpload={handleUpload}
          skill={uploadModalRequest}
        />
      </div>
    </Spin>
  );
};

export default SkillConfiguration;
