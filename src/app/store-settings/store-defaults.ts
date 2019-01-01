import { ActType, IAppState } from "./store-types";

export const TEST_CHARACTER = {
    name: 'Mortimore',
    defaultImageURL: '',
    moodImageURLs: {}
};
export const TEST_STAGE = {
    backgroundImageURL: '',
    characters: [],
    dialog: null,
    name: 'Field'
};

export const DEFAULT_ACT: ActType = { stages: [ TEST_STAGE ] };
export const DEFAULT_PATH_NAME: string = 'default';

export const INITIAL_STATE: IAppState = {
    characters: [ TEST_CHARACTER ],
    currentAct: 0,
    currentCharacter: null,
    currentPath: 'default',
    currentStage: null,
    paths: { 
        default: [ DEFAULT_ACT ]
    },
    showCharacterSelect: false,
    showDialogEditor: false
};