import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { SKILL_CATEGORIES } from "../../constants/scoutingConstants";
import { Skill } from "../../types/scoutingTypes";
import "./scouting.css";
import SkillCard from "./skillCard";

const { Option } = Select;

const SkillConfiguration: React.FC = () => {
  const [form] = Form.useForm();
  const [skills, setSkills] = useState<Skill[]>([]);

  const onFinish = (values: any) => {
    if (values.name.trim() !== "") {
      const newSkillObj: Skill = {
        id: Date.now(),
        name: values.name.trim(),
        alias: values.alias.trim(),
        category: values.category,
        description: values.description.trim(),
        additional_info: values.additional_info,
      };
      setSkills((prevSkills) => [...prevSkills, newSkillObj]);
      form.resetFields();
    }
  };

  return (
    <div className="skill-configuration-container">
      <div className="skill-form">
        <h2>Add a New Skill</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter skill name" }]}
          >
            <Input placeholder="Enter skill name" />
          </Form.Item>
          <Form.Item name="alias" label="Alias">
            <Input placeholder="Enter alias" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
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
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
          <Form.Item name="additional_info" label="Additional Info">
            <Input.TextArea placeholder="Enter additional info" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="custom-button">
            Add Skill
          </Button>
        </Form>
      </div>
      <div className="skill-list">
        <h2>All Available Skills</h2>
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillConfiguration;
