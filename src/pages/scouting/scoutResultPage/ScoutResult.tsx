/* eslint-disable react-hooks/exhaustive-deps */
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { SCOUTING_SERVICE_URL } from "../../../constants/scoutingConstants";
import { ScoutRequest } from "../../../types/scoutingTypes";
import ThreeDHumanPose from "../common/progressPreview.js";
import "../scouting.css";
import { fetchData } from "../scoutingApis";
import ResultCard from "./ResultCards";

const ScoutResult: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeRequests, setActiveRequests] = useState<Array<ScoutRequest>>([]);
  const [highlight, setHighlight] = useState<number>(0);

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

  const onChange = (value: any) => {
    if (value <= 4) {
      setHighlight(0);
    } else if (value === 5) {
      setHighlight(1);
    } else if (value === 6) {
      setHighlight(2);
    } else if (value === 7 || value === 9) {
      setHighlight(3);
    } else if (value === 8 || value === 10) {
      setHighlight(4);
    } else if (value === 11) {
      setHighlight(5);
    } else if (value === 12) {
      setHighlight(7);
    } else if (value === 13 || value === 15) {
      setHighlight(7);
    } else if (value === 14 || value === 16) {
      setHighlight(8);
    }else{
      setHighlight(-1);
    }
  };

  return (
    <Spin spinning={loading}>
      {activeRequests.map((request) => (
        <div className="scout-result-container">
          <div>
            STATUS: {request.status === 2 ? "IN PROGRESS" : "COMPLETED"}
          </div>
          <ThreeDHumanPose selectedSkill={request} onChange={onChange} />
          <ResultCard request={request} highlight={highlight} />
        </div>
      ))}
    </Spin>
  );
};

export default ScoutResult;
