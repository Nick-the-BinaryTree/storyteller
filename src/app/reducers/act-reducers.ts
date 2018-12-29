import { copyAct, copyState } from "./reducer.utils";
import { ActType, IAppState, DEFAULT_ACT } from "../store";

export const addActReducer = (state: IAppState): IAppState => {
    const curPathLen = state.paths[state.currentPath].length;
    const newState = copyState(state);
    let toPush: ActType;

    if (state.paths[state.currentPath].length > 0) {
        toPush = copyAct(state.paths[state.currentPath][curPathLen-1]);
    } else {
        toPush = copyAct(DEFAULT_ACT);
    }
    newState.paths[state.currentPath].push(toPush);

    return newState;
};

export const deleteActReducer = (state: IAppState): IAppState => {
    const newState = copyState(state);

    delete newState.paths[state.currentPath][state.currentAct];

    return newState;
};

export const switchActReducer = (state: IAppState, 
    payload: number): IAppState => {
    if (0 > payload && payload >= state.paths[state.currentPath].length) {
        return state;
    }
    const newState = copyState(state);

    newState.currentAct = payload;

    return newState;
};