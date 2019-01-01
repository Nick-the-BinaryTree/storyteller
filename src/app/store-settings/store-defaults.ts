import { ActType, IAppState } from "./store-types";

export const DEFAULT_ACT: ActType = { stages: [] };
export const DEFAULT_PATH_NAME: string = 'default';

export const INITIAL_STATE: IAppState = {
    characters: [],
    currentAct: 0,
    currentCharacter: null,
    currentPath: 'default',
    currentStage: null,
    paths: { 
        default: [ DEFAULT_ACT ]
    },
    showDialogEditor: false
};