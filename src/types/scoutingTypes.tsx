export interface Skill {
  _id: number;
  name: string;
  alias: string;
  category: number;
  description: string;
  additional_info: any;
  modifiedBy?: string;
  modified?: string;
  training_status: number;
}

export interface SkillCardProps {
  skill: Skill;
  onAction: Function;
  onUploadRequest: Function;
}

export interface ScoutSkillCardProps {
  skill: Skill;
  onAction: Function;
}

export interface SkillConfigurationProps {
  existingSkills: Skill[];
}

export interface SkillListProps {
  skills: Skill[];
  loading: boolean;
  onAction: (type: number, skill: Skill) => void;
  onUploadRequest: (skill: Skill) => void;
}

export interface ScoutSkillListProps {
  skills: Skill[];
  loading: boolean;
  onAction: (skill: Skill) => void;
  validSession: boolean;
}

export interface ScoutRequestConfigurationProps {
  selectedSkill: Skill;
}

export interface CreateSkill {
  name: string;
  alias: string;
  category: number;
  description: string;
  additional_info: any;
}

export interface UpdateSkill {
  alias: string;
  category: number;
  description: string;
  additional_info: any;
}

export interface FileUploadModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpload: (formData: FormData) => void;
  skill?: Skill;
}
export interface ParameterCardProps {
  parameter: {
    name: string;
    total_angle: number;
    total_distance: number;
    length: number;
  };
}

export interface ScoutRequest {
  archived: number;
  created: number;
  createdBy: number;
  modified: number;
  modifiedBy: number;
  request_type: string;
  skill: string;
  status: number;
  _id: string;
}

export interface ProgressContentProps {
  selectedSkill: string;
}

export interface CustomOptionProps {
  imageURL?: string;
  categoryName: string;
  categoryValue: number;
}