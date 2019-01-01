import { copyAct, copyState } from "./reducer.utils";
import { DEFAULT_ACT } from "../store-settings/store-defaults";
import { CharacterType, IAppState, StageType, ActType } from "../store-settings/store-types";

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
    newState.currentAct = newState.paths[state.currentPath].length-1;

    return newState;
};

export const deleteActReducer = (state: IAppState): IAppState => {
    const newState = copyState(state);

    newState.paths[state.currentPath]
        .splice(state.currentAct, 1);
    newState.currentAct--;

    return newState;
};

export const switchActReducer = (state: IAppState, 
    payload: number): IAppState => {
    if (payload < 0 || payload >= state.paths[state.currentPath].length) {
        return state;
    }
    const newState = copyState(state);

    newState.currentAct = payload;

    return newState;
};