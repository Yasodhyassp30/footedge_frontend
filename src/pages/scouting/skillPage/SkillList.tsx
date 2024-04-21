import { Input } from "antd";
import { useEffect, useState } from "react";
import { Skill, SkillListProps } from "../../../types/scoutingTypes";
import '../scouting.css';
import SkillCard from "./skillCard";

const { Search } = Input;

const SkillList: React.FC<SkillListProps> = ({ skills, onAction, onUploadRequest }) => {
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
      <div className="skill-search">
        <Search placeholder="Search by skill name" onChange={handleSearch} />
      </div>
      <div className="scrollable-list">
      
          {filteredSkills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} onAction={onAction} onUploadRequest={onUploadRequest}/>
          ))}
  
      </div>
    </div>
  );
};

export default SkillList;
