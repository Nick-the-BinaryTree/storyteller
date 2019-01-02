import { copyState } from "./reducer.utils";
import { CharacterType, IAppState } from "../store-settings/store-types";
import { getStage, getStageCharacters } from "../global-utils/state-utils";

export const addCharacterReducer = (state: IAppState, 
    payload: CharacterType): IAppState => {
    const newState = copyState(state);

    if (state.characters.some(c => c.name === payload.name)) {
        return state;
    }
    newState.characters.push(payload);
    newState.currentCharacter = null;

    return newState;
};

export const addCharacterToStageReducer = (state: IAppState, 
    payload: string): IAppState => {
    const newState = copyState(state);
    const stage = getStage(newState);

    if (stage == null || stage.characters.some(c => name === payload)) {
        return state;
    }
    stage.characters.push(payload);

    return newState;
};

export const deleteCharacterReducer = (state: IAppState): IAppState => {
    const newState = copyState(state);
    const currentCharacterName = state.characters[state.currentCharacter].name;

    newState.characters.splice(state.currentCharacter, 1);
    newState.currentCharacter = null;

    for (const path in newState.paths) {
        for (const act of newState.paths[path]) {
            for (let stage of act.stages) {
                stage.characters = stage.characters.filter(c => c !== currentCharacterName);
            }
        }
    }

    return newState;
};

export const deleteCharacterFromStageReducer = (state: IAppState,
    payload: number): IAppState => {
    const newState = copyState(state);
    const characters = getStageCharacters(newState);

    if (0 > payload || payload >= characters.length) {
        return state;
    }
    characters.splice(payload, 1);

    return newState;
}

export const editCharacterReducer = (state: IAppState, 
    payload: CharacterType): IAppState => {
    const newState = copyState(state);

    if (!state.characters.some(c => c.name === payload.name)) {
        return state;
    }
    newState.characters[
        newState.characters.map(c => c.name).indexOf(payload.name)
    ] = payload;
    newState.currentCharacter = null;
    
    return newState;
}