import { getAct, copyState } from "./reducer.utils";
import { IAppState } from "../store";

export const addPathReducer = (state: IAppState, payload: string) => {
    if (state.paths.hasOwnProperty(payload)) {
        return state;
    }
    const newState = copyState(state);
    
    newState.paths[payload] = [ getAct(state) ];
    newState.currentAct = 0;
    newState.currentPath = payload;

    return newState;
};

export const switchPathReducer = (state: IAppState, 
    payload: string): IAppState => {
    if (state.paths.hasOwnProperty(payload)) {
        return state;
    }
    const newState = copyState(state);

    newState.currentPath = payload;

    return newState;
};