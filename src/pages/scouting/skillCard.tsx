import { Card } from 'antd';
import React from 'react';
import { SkillCardProps } from '../../types/scoutingTypes';
import './scouting.css';

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
    return (
        <Card
            title={skill.name}
            className="skill-card"
        >
            <p><strong>Alias:</strong> {skill.alias}</p>
            <p><strong>Category:</strong> {skill.category}</p>
            <p><strong>Description:</strong> {skill.description}</p>
            <p><strong>Modified By:</strong> {skill.modifiedBy}</p>
            <p><strong>Modified Date:</strong> {skill.modifiedDate}</p>
        </Card>
    );
};

export default SkillCard;
