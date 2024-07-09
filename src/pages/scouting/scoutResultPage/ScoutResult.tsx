import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { SCOUTING_SERVICE_URL } from "../../../constants/scoutingConstants";
import { ScoutRequest } from "../../../types/scoutingTypes";
import ThreeDHumanPose from "../common/progressPreview.js";
import "../scouting.css";
import { fetchData } from "../scoutingApis";

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
  const [activeRequests, setActiveRequests] = useState<Array<ScoutRequest>>([]);

  useEffect(() => {
    setLoading(true);

    const callAPI = async () => {
      const url = `${SCOUTING_SERVICE_URL}/scout/all?type=SCOUTING`;
      const result = await fetchData(url);
      setActiveRequests(result);
      setLoading(false);
    };

    callAPI();
  }, []);

  console.log(activeRequests);
  return (
    <Spin spinning={loading}>
      {activeRequests.map((request) => (
        <div className="scout-result-container">
          <div className="parameter-cards-container">
            <ThreeDHumanPose selectedSkill={request.skill} />
          </div>
        </div>
      ))}
    </Spin>
  );
};

export default ScoutResult;
