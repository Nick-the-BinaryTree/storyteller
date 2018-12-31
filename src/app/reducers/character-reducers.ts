import { copyState, getAct } from "./reducer.utils";
import { CharacterType, IAppState } from "../store-settings/store-types";

export const addCharacterReducer = (state: IAppState, 
    payload: CharacterType): IAppState => {
    const newState = copyState(state);
    const act = getAct(newState);

    if (act.characters.some(c => c.name === payload.name)) {
        return state;
    }
    act.characters.push(payload);
    newState.currentCharacter = act.characters.length-1;

    return newState;
};

export const deleteCharacterReducer = (state: IAppState, 
    payload: string): IAppState => {
    const newState = copyState(state);
    const act = getAct(newState);

    if (!act.characters.some(c => c.name === payload)) {
        return state;
    }
    act.characters.splice(
        act.characters.map(c => c.name).indexOf(payload),
        1
    );
    return newState;
};

export const editCharacterReducer = (state: IAppState, 
    payload: CharacterType): IAppState => {
    const newState = copyState(state);
    const act = getAct(newState);

    if (!act.characters.some(c => c.name === payload.name)) {
        return state;
    }
    act.characters[
        act.characters.map(c => c.name).indexOf(payload.name)
    ] = payload;
    
    return newState;
}