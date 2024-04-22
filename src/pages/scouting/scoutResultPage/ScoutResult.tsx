import { Progress, Spin } from "antd";
import React, { useState } from "react";
import "../scouting.css";
import ParameterCard from "./ParameterCard";

const sampleParameter = {
  name: "Accuracy",
  accuracy: 85,
  total: 100,
  correct: 85,
  incorrect: 15,
  offset: {
    distance: "10 meters",
    corner: "bottom left",
  },
};

const ScoutResult: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const selectedSkill = "Hello";

  return (
    <Spin spinning={loading}>
      {selectedSkill && (
        <div className="scout-result-container">
          <div className="progress-container">
            <h2>Progress</h2>
            <Progress percent={10} />
          </div>
          <div className="parameter-cards-container">
            <div className="container-body">
              {[selectedSkill].map((parameter, index) => (
                <ParameterCard
                  key={sampleParameter.name}
                  parameter={sampleParameter}
                  progress={10}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Spin>
  );
};

export default ScoutResult;
