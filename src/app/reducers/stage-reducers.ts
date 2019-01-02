import { getAct, copyState } from "./reducer.utils";
import { IAppState, StageType } from "../store-settings/store-types";

export const addStageReducer = (state: IAppState, 
    payload: StageType): IAppState => {
    const newState = copyState(state);
    const act = getAct(newState);

    if(act.stages.some(s => s.name === payload.name)) {
        return state;
    }
    act.stages.push(payload);
    newState.currentStage = null;

    return newState;
};

export const deleteStageReducer = (state: IAppState): IAppState => {
    const newState = copyState(state);
    const act = getAct(newState);

    act.stages.splice(state.currentStage, 1);
    newState.currentStage = null;

    return newState;
};

export const editStageReducer = (state: IAppState,
    payload: StageType): IAppState => {
    const newState = copyState(state);
    const act = getAct(newState);

    if(!act.stages.some(s => s.name === payload.name)) {
        return state;
    }
    act.stages[
        act.stages.map(s => s.name).indexOf(payload.name)
    ] = payload;
    newState.currentStage = null;

    return newState;
};