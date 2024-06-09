import { Button } from "@material-tailwind/react";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { SCOUTING_SERVICE_URL } from "../../../constants/scoutingConstants";
import { Skill } from "../../../types/scoutingTypes";
import { ProgressContent } from "../common/progressContent";
import FileUploadModal from "../common/uploadVideo";
import "../scouting.css";
import { fetchData, uploadFiles } from "../scoutingApis";
import ScoutingSkillList from "./ScoutingSkillList";

const ScoutConfiguration: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [files, setFiles] = useState<FormData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [validSession, setValidSession] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<String | undefined>();
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
    setLoading(true);
    const url = `${SCOUTING_SERVICE_URL}/files?type=TRAINING`;
    const result = await uploadFiles(files[0], skill, url, 'SKILL');
    setSelectedSkill(result.process_id);
    setLoading(false);
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
              skills={skills.filter((skill) => skill.training_status === 1)}
              loading={loading}
              onAction={onAction}
            />
          </div>
        </>
      )}
      {selectedSkill && (
      <ProgressContent selectedSkill={'jij'}/>
      )}
    </Spin>
  );
};

export default ScoutConfiguration;
