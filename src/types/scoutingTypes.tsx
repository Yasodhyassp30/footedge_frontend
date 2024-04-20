export interface Skill {
  id: number;
  name: string;
  alias: string;
  category: number;
  description: string;
  additional_info: any;
  modifiedBy?: string;
  modifiedDate?: string;
}

export interface SkillCardProps {
  skill: Skill;
}

export interface SkillConfigurationProps {
  existingSkills: Skill[]; // Define the type of existingSkills
}