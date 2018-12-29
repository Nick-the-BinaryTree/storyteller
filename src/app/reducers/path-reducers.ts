import { getAct, copyState } from "./reducer.utils";
import { DEFAULT_PATH_NAME, IAppState } from "../store";

export const addPathReducer = (state: IAppState, 
    payload: string): IAppState => {
    if (state.paths.hasOwnProperty(payload)) {
        return state;
    }
    const newState = copyState(state);
    
    newState.paths[payload] = [ getAct(state) ];
    newState.currentAct = 0;
    newState.currentPath = payload;

    return newState;
};

export const deletePathReducer = (state: IAppState, 
    payload: string): IAppState => {
    if (payload === DEFAULT_PATH_NAME) {
        return state;
    }
    const newState = copyState(state);
    
    newState.currentAct = 0;
    newState.currentPath = DEFAULT_PATH_NAME;
    delete newState.paths[payload];

    return newState;
};

export const switchPathReducer = (state: IAppState, 
    payload: string): IAppState => {
    if (!state.paths.hasOwnProperty(payload)) {
        return state;
    }
    const newState = copyState(state);

    newState.currentAct = 0;
    newState.currentPath = payload;

    return newState;
};