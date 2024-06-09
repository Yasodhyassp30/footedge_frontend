import { Card } from "antd";
import classNames from "classnames";
import React from "react";
import { ParameterCardProps } from "../../../types/scoutingTypes";
import "../scouting.css";

const ParameterCard: React.FC<ParameterCardProps> = ({ parameter }) => {
  const { total_angle, total_distance, name, length } = parameter;

  const cardClasses = classNames("parameter-card", {
    "parameter-card-clickable": true, // Add this class if you want the card to be clickable
  });

  const handleClick = () => {
    // Handle click event here
  };

  const accuracy = ((total_angle - length * 0.2 > 0 ? ((total_angle - length * 0.2)/length)*100 : 100) + (total_distance - length * 1.1 > 0 ? ((total_distance - length * 1.1)/length * 1.1)*100 : 100))/2;
  return (
    <Card className={cardClasses} title={name} onClick={handleClick}>
      <p className="parameter-detail">Accuracy: {accuracy.toFixed(1)}%</p>
      <p className="parameter-detail">Angle: {(total_angle / length).toFixed(2)}</p>
      <p className="parameter-detail">
        Distance: {(total_distance / length).toFixed(2)}
      </p>
    </Card>
  );
};

export default ParameterCard;
