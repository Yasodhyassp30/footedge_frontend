import { Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { ScoutSkillListProps, Skill } from "../../../types/scoutingTypes";
import "../scouting.css";
import ScoutSkillCard from "./ScoutSkillCard";

const { Search } = Input;

const ScoutingSkillList: React.FC<ScoutSkillListProps> = ({
  skills,
  onAction,
  validSession,
}) => {
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  useEffect(() => {
    setFilteredSkills(skills);
  }, [skills]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filtered = skills.filter((skill) =>
      skill.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSkills(filtered);
  };

  return (
    <div className="skill-list">
      <Spin spinning={!validSession}>
        <div className="skill-search">
          <Search placeholder="Search by skill name" onChange={handleSearch} />
        </div>
        <div className="scrollable-list">
          {filteredSkills.map((skill) => (
            <ScoutSkillCard key={skill._id} skill={skill} onAction={onAction} />
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default ScoutingSkillList;
