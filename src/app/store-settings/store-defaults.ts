import { ActType, IAppState } from "./store-types";
import { TEST_CHARACTER } from "../reducers/character-reducers.spec";
import { TEST_STAGE } from "../reducers/stage-reducers.spec";

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