import { FourTree } from "src/data-structures/four-tree";
import { ADD_ACT, ADD_CHARACTER, ADD_PATH, ADD_STAGE, 
    EDIT_CHARACTER, EDIT_STAGE } from "./actions";

export type ActType = {
    characters: Array<CharacterType>,
    stages: Array<StageType>
};
export type CharacterType = {
    name: string,
    defaultImageURL: string,
    moodImageURLs: { [key: string]: string } // string key and value
};
export type PathType = Array<ActType>;
export type StageType = {
    name: string,
    backgroundImageURL: string,
    dialog: FourTree
};

export interface IAppState {
    // each narrative path is an array of acts
    currentAct: number,
    currentPath: string,
    paths: {
        [path: string]: PathType
    }
}

export const DEFAULT_ACT = { characters: [], stages: [] };

export function rootReducer(state: IAppState, 
    action: {type: string, payload: any}): IAppState {
    switch (action.type) {
        case ADD_CHARACTER:
            break;
        case ADD_STAGE:
            break;
        case EDIT_CHARACTER:
            break;
        case EDIT_STAGE:
            break;
    }
    return INITIAL_STATE;
}

export const INITIAL_STATE: IAppState = {
    currentAct: 0,
    currentPath: 'default',
    paths: { 
        default: [DEFAULT_ACT]
    }
};