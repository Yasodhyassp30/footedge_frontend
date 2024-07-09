import { Form, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  PLAYER_IDS,
  SCOUTING_SERVICE_URL,
} from "../../../constants/scoutingConstants";
import { Skill } from "../../../types/scoutingTypes";
import CustomOption from "../common/CustomOption";
import FileUploadModal from "../common/uploadVideo";
import "../scouting.css";
import { fetchData, uploadFiles } from "../scoutingApis";
import ScoutingSkillList from "./ScoutingSkillList";

const { Option } = Select;

const ScoutConfiguration: React.FC = () => {
  const [form] = Form.useForm();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>();
  const [selectedPlayer, setSelectedPlayer] = useState<number | undefined>();
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
    await uploadFiles(formData, selectedSkill, selectedPlayer, url, "SCOUTING");
    setUploadModalVisible(false);
    setSelectedPlayer(0);
    setSelectedSkill(undefined);
  };

  const onUploadModelClose = () => {
    setUploadModalVisible(false);
    setSelectedSkill(undefined);
  };

  const handlePlayerSelect = (player: any) => {
    console.log("Selected Player: ", player);
    setSelectedPlayer(player);
  }

  return (
    <Spin spinning={loading}>
      {selectedSkill && (
        <Form form={form}>
          <Form.Item name="linked_player" label="Linked Player">
            <Select placeholder="Select player" className="icon-select" onChange={handlePlayerSelect}>
              {Object.keys(PLAYER_IDS).map((key) => {
                const category = parseInt(key);
                const categoryName = PLAYER_IDS[category];
                const imageURL = ""; // Add logic to get the image URL if available

                return (
                  <Option value={category} key={key}>
                    <div className="option-content">
                      <CustomOption
                        imageURL={imageURL}
                        categoryName={categoryName}
                        categoryValue={category}
                      />
                    </div>
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      )}
      {selectedSkill && selectedPlayer && (
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
