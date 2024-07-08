import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { SCOUTING_SERVICE_URL } from "../../../constants/scoutingConstants";
import { Skill } from "../../../types/scoutingTypes";
import FileUploadModal from "../common/uploadVideo";
import "../scouting.css";
import { fetchData, uploadFiles } from "../scoutingApis";
import ScoutingSkillList from "./ScoutingSkillList";

const ScoutConfiguration: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    setSelectedSkill(skill);
    setLoading(false);
  };

  const onUpload = async (formData: FormData) => {
    const url = `${SCOUTING_SERVICE_URL}/files`;
    await uploadFiles(formData, selectedSkill, url, "SCOUTING");
    setUploadModalVisible(false);
  };

  const onUploadModelClose = () => {
    setUploadModalVisible(false);
    setSelectedSkill(undefined);
  };

  return (
    <Spin spinning={loading}>
      {selectedSkill && (
        <>
          <div className="scout-configuration-container">
            <div>
              <h1 className="scout-title">Schedule A Scout</h1>
              <h1 className="scout-sub-title">
                Upload 2 videos and Select a trained skill from the list to get
                started
              </h1>
            </div>
          </div>
          <div>
            <FileUploadModal
              visible={uploadModalVisible}
              onCancel={onUploadModelClose}
              onUpload={onUpload}
            />
          </div>
        </>
      )}
      {!selectedSkill && (
        <div>
          <ScoutingSkillList
            validSession
            skills={skills.filter((skill) => skill.training_status === 2)}
            loading={loading}
            onAction={onAction}
          />
        </div>
      )}
    </Spin>
  );
};

export default ScoutConfiguration;
