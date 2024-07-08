import { Button, Progress, Spin } from "antd";
import { useEffect, useState } from "react";
import { SCOUTING_SERVICE_URL } from "../../../constants/scoutingConstants";
import { ProgressContentProps } from "../../../types/scoutingTypes";
import ParameterCard from "../scoutPage/ResultParameterCard";
import { fetchData } from "../scoutingApis";

export const ProgressContent: React.FC<ProgressContentProps> = ({
  selectedSkill,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [latestRequest, setLatestRequest] = useState<any>();

  useEffect(() => {
    if (selectedSkill) {
      setLoading(true);

      const callAPI = async () => {
        // const url = `${SCOUTING_SERVICE_URL}/scout/${selectedSkill}`;
        const url = `${SCOUTING_SERVICE_URL}/scout/66798830bbb733081142f03a?type=SCOUTING`;
        const result = await fetchData(url);
        setLatestRequest(result);
        setLoading(false);
      };

      callAPI();
    }
  }, [selectedSkill]);

  console.log(latestRequest, "latestRequest");

  return (
    <Spin spinning={loading || !latestRequest}>
      {latestRequest && <div className="scout-result-container">
        <div className="progress-container">
          <h2>Progress</h2>
          <Progress percent={(latestRequest.result_length/300)*100} showInfo={false}/>
        </div>
        <div>Quality</div>
        <div>Angle {(latestRequest.quality.angle).toFixed(1)}%</div>
        <div>Distance {(latestRequest.quality.distance).toFixed(1)}% </div>
        <div className="parameter-cards-container">
          <div className="container-body">
            {Object.keys(latestRequest.results).map((key) => {
              const result = latestRequest.results[key];
              return <ParameterCard
                key={key}
                parameter={{...result, name: key, length: latestRequest.result_length}}
              />
            })}
          </div>
          <div className="container-footer">
            <Button className="scout-config-back">Back</Button>
            <Button className="scout-config-back">Refresh</Button>
          </div>
        </div>
      </div>}
    </Spin>
  );
};
