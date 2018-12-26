import { FourTree } from "src/data-structures/four-tree";
import { ADD_CHARACTER, ADD_STAGE, EDIT_CHARACTER, 
    EDIT_STAGE_BACKGROUND, EDIT_STAGE_DIALOG, 
    EDIT_STAGE_MUSIC } from "./actions";

export type CharacterType = {
    name: string,
    defaultImageURL: string,
    moodImageURLs: { [key: string]: string } // string key and value
};
export type StageType = {
    name: string,
    backgroundImageURL: string,
    dialog: FourTree
};

export interface IAppState {
    characters: Array<CharacterType>,
    paths: { [key: string]: number }, // different story paths w/ # of acts
    stages: Array<StageType>
}

export function rootReducer(state: IAppState, 
    action: {type: string, payload: any}): IAppState {
    switch (action.type) {
        case ADD_CHARACTER:
            return addCharacterReducer(state, action.payload);
        case ADD_STAGE:
            break;
        case EDIT_CHARACTER:
            break;
        case EDIT_STAGE_BACKGROUND:
            break;
        case EDIT_STAGE_DIALOG:
            break;
        case EDIT_STAGE_MUSIC:
            break;
    }
}

export const INITIAL_STATE: IAppState = {
    characters: [],
    paths: { default: 1 },
    stages: []
};

const addCharacterReducer = (state: IAppState, 
    payload: CharacterType): IAppState => {
    for (const character of state.characters) {
        if (character.name === payload.name) {
            return state;
        }
    }
    return { characters: state.characters.concat(payload), ...state };
}