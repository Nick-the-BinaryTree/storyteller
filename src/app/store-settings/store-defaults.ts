import { ActType, IAppState } from "./store-types";

export const TEST_CHARACTER = {
    name: 'Mortimore',
    defaultImageURL: 'http://hi.com/morty.jpg',
    moodImageURLs: { ambivalent: 'http://tim.com/pensiveTim.jpg', cyborgMode: 'http://tim.com/robotTim.jpg' }
};
export const TEST_CHARACTER_2 = {
    name: 'Zebra Leader',
    defaultImageURL: '',
    moodImageURLs: {}
};
export const TEST_STAGE = {
    backgroundImageURL: '',
    characters: [ TEST_CHARACTER.name, TEST_CHARACTER_2.name ],
    dialog: null,
    name: 'Field'
};
export const TEST_STAGE_2 = {
    backgroundImageURL: '',
    characters: [],
    dialog: null,
    name: 'Town'
};
export const TEST_DEFAULT_ACT: ActType = { stages: [ TEST_STAGE, TEST_STAGE_2 ] };

export const DEFAULT_ACT: ActType = { stages: [] };
export const DEFAULT_PATH_NAME: string = 'default';

export const TEST_INITIAL_STATE: IAppState = {
    characters: [],
    currentAct: 0,
    currentCharacter: null,
    currentPath: DEFAULT_PATH_NAME,
    currentStage: null,
    paths: { 
        default: [ TEST_DEFAULT_ACT ]
    },
    showCharacterSelect: false,
    showDialogEditor: false
};

export const INITIAL_STATE: IAppState = {
    characters: [ TEST_CHARACTER, TEST_CHARACTER_2 ],
    currentAct: 0,
    currentCharacter: null,
    currentPath: DEFAULT_PATH_NAME,
    currentStage: null,
    paths: { 
        default: [ TEST_DEFAULT_ACT ]
    },
    showCharacterSelect: false,
    showDialogEditor: false
};