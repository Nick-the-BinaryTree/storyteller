import { copyState, getAct } from "./reducer.utils";
import { CharacterType, IAppState } from "../store-settings/store-types";

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

export const deleteCharacterReducer = (state: IAppState, 
    payload: string): IAppState => {
    const newState = copyState(state);

    if (!state.characters.some(c => c.name === payload)) {
        return state;
    }
    newState.characters.splice(
        newState.characters.map(c => c.name).indexOf(payload),
        1
    );
    newState.currentCharacter = null;

    return newState;
};

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