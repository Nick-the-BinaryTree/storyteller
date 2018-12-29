import { copyState, getAct } from "./reducer.utils";
import { IAppState, CharacterType } from "../store";

export const addCharacterReducer = (state: IAppState, 
    payload: CharacterType): IAppState => {
    const newState = copyState(state);
    const act = getAct(newState);

    for (const character of act.characters) {
        if (character.name === payload.name) {
            return state;
        }
    }
    act.characters.push(payload);

    return newState;
};

export const deleteCharacterReducer = (state: IAppState, 
    payload: string): IAppState => {
    const newState = copyState(state);
    const act = getAct(newState);

    if (act.characters.some(c => c.name === payload)) {
        return state;
    }
    delete act.characters[
        act.characters.map(c => c.name).indexOf(payload)
    ];
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