export const SCOUTING_PAGE_INDEXES = {
  CONFIGURE_SKILL: 0,
  SCOUT: 1,
  RESULT: 2,
};

export const SCOUTING_PAGE_NAMES = {
  [SCOUTING_PAGE_INDEXES.CONFIGURE_SKILL]: "Configure Skill",
  [SCOUTING_PAGE_INDEXES.SCOUT]: "Scout",
  [SCOUTING_PAGE_INDEXES.RESULT]: "Result",
};

export const SKILL_CATEGORIES: { [key: number]: string } = {
    1: "Dribbling",
    2: "Passing",
    3: "Shooting",
    4: "Ball Control",
    5: "Positioning",
    6: "Decision Making",
    7: "Communication",
    8: "Speed",
    9: "Strength",
    10: "Endurance",
    11: "Concentration",
    12: "Confidence",
    13: "Resilience"
};

export const PLAYER_IDS: { [key: number]: string } = {
  1: "Player 1",
};


export const SKILL_CARD_MENU_ACTIONS = ['Create', 'Edit', 'Copy', 'Delete'];

export const CREATE = SKILL_CARD_MENU_ACTIONS.indexOf('Create');
export const EDIT = SKILL_CARD_MENU_ACTIONS.indexOf('Edit');
export const COPY = SKILL_CARD_MENU_ACTIONS.indexOf('Copy');
export const DELETE = SKILL_CARD_MENU_ACTIONS.indexOf('Delete');

export const SCOUTING_SERVICE_URL = "http://localhost:5001";

export const TRAINING_STATUS_TO_TEXT_MAP = new Map([
  [0, 'PENDING'],
  [1, 'IN_PROGRESS'],
  [2, 'SUCCESS'],
  [3, 'ERROR']
]);

