/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { SCOUTING_SERVICE_URL } from "../../../constants/scoutingConstants";
import { fetchData } from "../scoutingApis";

const dataPoints = [
  { id: 1, name: "Head" },
  { id: 6, name: "Left Shoulder" },
  { id: 7, name: "Right Shoulder" },
  { id: 8, name: "Left Hand" },
  { id: 9, name: "Right Hand" },
  { id: 12, name: "Left Hip" },
  { id: 13, name: "Right Hip" },
  { id: 14, name: "Left Leg" },
  { id: 15, name: "Right Leg" },
];

const ResultCard = (request) => {
  const [quality, setQuality] = useState({});

  useEffect(() => {
    const callAPI = async (request) => {
      const url = `${SCOUTING_SERVICE_URL}/scout/${request.request._id}?type=SCOUTING`;
      const data = await fetchData(url);
      setQuality(data);
    };

    callAPI(request);
  }, [request]);

  return (
    <div className="parameter-cards-container">
      {quality.results && (
        <div>
          <h1>Overall Qulaity</h1>
          <h1>
            Distance:{quality.quality.distance}% And Angle{" "}
            {quality.quality.angle}%
          </h1>
        </div>
      )}
      {quality.results && (
        <div className="parameter-cards">
          {dataPoints.map((point, index) => {
            return (
              <div key={point.id} className="card" style={{background: request.highlight === index ?"red": "white"}}>
                <h3>{point.name}</h3>
                <p>
                  Offset:{" "}
                  {index === 0
                    ? quality.results[0]?.total_distance +
                      quality.results[1]?.total_distance +
                      quality.results[2]?.total_distance +
                      quality.results[3]?.total_distance +
                      quality.results[4]?.total_distance
                    : index === 1
                    ? quality.results[5]?.total_distance
                    : index === 2
                    ? quality.results[6]?.total_distance
                    : index === 3
                    ? quality.results[7]?.total_distance +
                      quality.results[9]?.total_distance
                    : index === 4
                    ? quality.results[8]?.total_distance +
                      quality.results[10]?.total_distance
                    : index === 5
                    ? quality.results[11]?.total_distance
                    : index === 6
                    ? quality.results[12]?.total_distance
                    : index === 7
                    ? quality.results[13]?.total_distance +
                      quality.results[15]?.total_distance
                    : index === 8
                    ? quality.results[14]?.total_distance +
                      quality.results[16]?.total_distance
                    : 0}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResultCard;
