import { Card, Tag, Typography } from "antd";
import React from "react";
import {
  SKILL_CATEGORIES,
  TRAINING_STATUS_TO_TEXT_MAP
} from "../../../constants/scoutingConstants";
import { ScoutSkillCardProps } from "../../../types/scoutingTypes";
import "../scouting.css";

const { Text, Paragraph } = Typography;

const ScoutSkillCard: React.FC<ScoutSkillCardProps> = ({ skill, onAction }) => {
  const formattedModifiedDate = new Date(skill.modified ?? "").toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const onClickOnCard = () => {
    onAction(skill);
  }

  return (
      <Card title={<Text strong>{skill.name}</Text>} className="skill-card" onClick={onClickOnCard}>
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
        <Text strong>
          Training Status:{" "}
          {TRAINING_STATUS_TO_TEXT_MAP.get(skill.training_status)}
        </Text>
      </Paragraph>
      <Paragraph>
        <Text strong>Modified By:</Text>{" "}
        {Number(skill.modifiedBy) === 1 ? "System" : "User"}
      </Paragraph>
      <Paragraph>
        <Text strong>Modified Date:</Text> {formattedModifiedDate}
      </Paragraph>
    </Card>
  );
};

export default ScoutSkillCard;
