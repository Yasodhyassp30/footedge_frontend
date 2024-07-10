/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Image, Spin } from "antd";
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
  const [highlight, setHighlight] = useState<number>(-1);
  const [sliderValue, setSliderValue] = useState<number>(1);
  const [image, setImage] = useState<Array<string>>([]);
  const [pageScope, setPageScope] = useState<number>(1);

  const handleSliderChange = async (value: number, req: any) => {
    setLoading(true);
    try {
      const url_1 = `${SCOUTING_SERVICE_URL}/scout/frames?image_id=${value}&skill=${req.skill}&unique_id=${req.unique_id}&type=1`;
      const url_2 = `${SCOUTING_SERVICE_URL}/scout/frames?image_id=${value}&skill=${req.skill}&unique_id=${req.unique_id}&type=2`;

      const response_1 = await fetchData(url_1);
      const response_2 = await fetchData(url_2);
      if (!response_1 || !response_2) {
        throw new Error("Network response was not ok");
      }
      const imageUrl_1 = `data:image/png;base64,${response_1}`;
      const imageUrl_2 = `data:image/png;base64,${response_2}`;
      setImage([imageUrl_1, imageUrl_2]);
      setSliderValue(value);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      setImage([]);
      setLoading(false);

    }
  };

  useEffect(() => {
    setLoading(true);

    const callAPI = async () => {
      const url = `${SCOUTING_SERVICE_URL}/scout/all?type=SCOUTING`;
      const result = await fetchData(url);
      setActiveRequests(result);
      setLoading(false);
    };

    callAPI();
    handleSliderChange(1, activeRequests[0]);
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
    } else {
      setHighlight(-1);
    }
  };

  const incrementSlider = (req: any) => {
    const newValue = sliderValue + 1;
    if (newValue <= 91) {
      handleSliderChange(newValue, req);
    }
  };

  const decrementSlider = (req: any) => {
    const newValue = sliderValue - 1;
    if (newValue >= 1) {
      handleSliderChange(newValue, req);
    }
  };

  return (
    <Spin spinning={loading}>
      <div>
        <Button style={{background: pageScope === 1 ?"white": "transparent"}} onClick={() => setPageScope(1)} >FRAME BY RESULT</Button>
        <Button style={{background: pageScope === 2 ?"white": "transparent"}}  onClick={() => setPageScope(2)}>OVERALL RESULT</Button>
      </div>
      {activeRequests.map((request) => (
        <div className="scout-result-container" key={request._id}>
          <div>
                <h1>SCOUT STATUS: {request.status === 2 ? "IN PROGRESS" : "COMPLETED"}</h1>
              </div>
          {pageScope === 1 && (
            <>
              
              <div className="slider-container">
                <Button onClick={() => decrementSlider(request)}>-</Button>
                <div className="images-container">
                  <div className="image-wrapper">
                    {image && image.length > 1 && (
                      <Image width={400} src={image[1]} />
                    )}
                    <div>TRAIN</div>
                  </div>
                  <div className="image-wrapper">
                    {image && image.length > 1 && (
                      <Image width={400} src={image[0]} />
                    )}
                    <div>SCOUT</div>
                  </div>
                </div>
                <Button onClick={() => incrementSlider(request)}>+</Button>
              </div>{" "}
            </>
          )}
          <ResultCard request={request} highlight={highlight} />
          {pageScope === 2 && (
            <ThreeDHumanPose selectedSkill={request} onChange={onChange} />
          )}
        </div>
      ))}
    </Spin>
  );
};

export default ScoutResult;
