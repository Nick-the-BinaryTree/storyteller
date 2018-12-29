import { getAct, copyState } from "./reducer.utils";
import { IAppState, StageType } from "../store";

export const addStageReducer = (state: IAppState, 
    payload: StageType): IAppState => {
    const newState = copyState(state);
    const act = getAct(newState);

    if(act.stages.some(s => s.name === payload.name)) {
        return state;
    }
    act.stages.push(payload);

    return newState;
};

export const deleteStageReducer = (state: IAppState,
    payload: string): IAppState => {
    const newState = copyState(state);
    const act = getAct(newState);

    if (!act.stages.some(s => s.name === payload)) {
        return state;
    }
    act.stages.splice(
        act.stages.map(s => s.name).indexOf(payload),
        1
    );
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

    return newState;
};