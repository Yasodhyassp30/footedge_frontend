import { Card } from "antd";
import classNames from "classnames";
import React from "react";
import { ParameterCardProps } from "../../../types/scoutingTypes";
import "../scouting.css";

const ParameterCard: React.FC<ParameterCardProps> = ({ parameter }) => {
  const { name, accuracy, total, correct, incorrect, offset } = parameter;

  const cardClasses = classNames("parameter-card", {
    "parameter-card-clickable": true, // Add this class if you want the card to be clickable
  });

  const handleClick = () => {
    // Handle click event here
  };

  return (
    <Card
      className={cardClasses}
      title={name}
      onClick={handleClick}
    >
      <p className="parameter-detail">Accuracy: {accuracy}%</p>
      <p className="parameter-detail">Total: {total}</p>
      <p className="parameter-detail">Correct: {correct}</p>
      <p className="parameter-detail">Incorrect: {incorrect}</p>
      <p className="parameter-detail">Offset: {offset.distance} {offset.corner}</p>
    </Card>
  );
};

export default ParameterCard;
