import { MoreOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Menu, Tag, Typography } from "antd";
import React from "react";
import { SKILL_CARD_MENU_ACTIONS, SKILL_CATEGORIES, TRAINING_STATUS_TO_TEXT_MAP } from "../../../constants/scoutingConstants";
import { SkillCardProps } from "../../../types/scoutingTypes";
import "../scouting.css";

const { Text, Paragraph } = Typography;

const SkillCard: React.FC<SkillCardProps> = ({ skill, onAction, onUploadRequest }) => {
  const handleAction = (type: string) => {
    onAction(parseInt(type), skill);
  };

  const menu = (
    <Menu onClick={(info) => handleAction(info.key)}>
      {SKILL_CARD_MENU_ACTIONS.slice(1).map((action, index) => (
        <Menu.Item key={index + 1} disabled={skill.training_status === 1}>
          {action}
        </Menu.Item>
      ))}
    </Menu>
  );

  const formattedModifiedDate = new Date(skill.modified || "").toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Card
      title={<Text strong>{skill.name}</Text>}
      className="skill-card"
      extra={
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            onClick={(e) => e.stopPropagation()}
            style={{ border: "none", background: "none", padding: 0 }}
            icon={<MoreOutlined />}
          />
        </Dropdown>
      }
    >
      <div className="skill-card-content">
        <Paragraph>
          <Text strong>Alias:</Text> {skill.alias}
        </Paragraph>
        <Paragraph>
          <Text strong>Category:</Text>
          <Tag color="blue">{SKILL_CATEGORIES[skill.category]}</Tag>
        </Paragraph>
        <Paragraph>
          <Text strong>Description:</Text> {skill.description}
        </Paragraph>
        <Paragraph>
          <Text strong>Training Status:</Text>{" "}
          {TRAINING_STATUS_TO_TEXT_MAP.get(skill.training_status)}{" "}
          {skill.training_status === 0 && (
            <Button type="link" className="add-more-button" onClick={() => onUploadRequest(skill)}>
              (Add a video to start)
            </Button>
          )}
        </Paragraph>
        <Paragraph>
          <Text strong>Modified By:</Text> {Number(skill.modifiedBy) === 1 ? "System" : "User"}
        </Paragraph>
        <Paragraph>
          <Text strong>Modified Date:</Text> {formattedModifiedDate}
        </Paragraph>
      </div>
    </Card>
  );
};

export default SkillCard;
