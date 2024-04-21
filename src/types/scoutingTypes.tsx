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
  onAction: Function,
  onUploadRequest: Function
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
}