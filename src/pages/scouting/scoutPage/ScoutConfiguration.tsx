import { Button } from "@material-tailwind/react";
import { Progress, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { SCOUTING_SERVICE_URL } from "../../../constants/scoutingConstants";
import { Skill } from "../../../types/scoutingTypes";
import FileUploadModal from "../common/uploadVideo";
import "../scouting.css";
import { fetchData, uploadFiles } from "../scoutingApis";
import ParameterCard from "./ParameterCard";
import ScoutingSkillList from "./ScoutingSkillList";

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

const ScoutConfiguration: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [files, setFiles] = useState<FormData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [validSession, setValidSession] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>();
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const callAPI = async () => {
      const url = `${SCOUTING_SERVICE_URL}/skills`;
      const result = await fetchData(url);
      setSkills(result);
      setLoading(false); // Move setLoading inside the async function
    };

    callAPI();
  }, []);

  const onAction = async (skill: Skill) => {
    setSelectedSkill(skill);
    setLoading(true);
    const url = `${SCOUTING_SERVICE_URL}/files`;
    await uploadFiles(files[0], selectedSkill, url, 'SCOUTING');
  };

  const onUpload = async (formData: FormData) => {
    setValidSession(true);
    setUploadModalVisible(false);
    setFiles([formData])
  };

  const onUploadModelClose = () => {
    setUploadModalVisible(false);
    setValidSession(false);
  };

  const onRefresh = () => {
    setUploadModalVisible(true);
    setValidSession(false);
  }

  return (
    <Spin spinning={loading}>
      {!selectedSkill && (
        <>
          <div className="scout-configuration-container">
            <div>
              <h1 className="scout-title">Schedule A Scout</h1>
              <h1 className="scout-sub-title">
                Upload 2 videos and Select a trained skill from the list to get
                started
              </h1>
              {!validSession && (
                <Button placeholder="Back" className="scout-config-back" onClick={onRefresh}>
                  Refresh
                </Button>
              )}
            </div>
          </div>
          <div>
            <FileUploadModal
              visible={uploadModalVisible}
              onCancel={onUploadModelClose}
              onUpload={onUpload}
            />
          </div>

          <div>
            <ScoutingSkillList
              validSession={validSession}
              skills={skills.filter((skill) => skill.training_status === 2)}
              loading={loading}
              onAction={onAction}
            />
          </div>
        </>
      )}
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
            <div className="container-footer">
              <Button placeholder="Back" className="scout-config-back">
                Back
              </Button>
            </div>
          </div>
        </div>
      )}
    </Spin>
  );
};

export default ScoutConfiguration;
