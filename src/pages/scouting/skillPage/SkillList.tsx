import { Empty, Input } from "antd";
import React from "react";
import { Skill, SkillListProps } from "../../../types/scoutingTypes";
import "../scouting.css";
import SkillCard from "./skillCard";

const { Search } = Input;

const SkillList: React.FC<SkillListProps> = ({ skills, onAction, onUploadRequest }) => {
  const [filteredSkills, setFilteredSkills] = React.useState<Skill[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>("");

  React.useEffect(() => {
    setFilteredSkills(skills);
  }, [skills]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    const filtered = skills.filter((skill) =>
      skill.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSkills(filtered);
  };

  return (
    <div className="skill-list">
      <div className="skill-search">
        <Search
          className="search-input"
          placeholder="Search by skill name"
          value={searchValue}
          onChange={handleSearch}
          allowClear
        />
      </div>
      <div className="scrollable-list">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <SkillCard
              key={skill._id}
              skill={skill}
              onAction={onAction}
              onUploadRequest={onUploadRequest}
            />
          ))
        ) : (
          <Empty description="No skills found" />
        )}
      </div>
    </div>
  );
};

export default SkillList;
