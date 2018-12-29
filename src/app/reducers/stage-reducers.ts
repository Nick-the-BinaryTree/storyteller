import { getAct, copyState } from "./reducer.utils";
import { IAppState, StageType } from "../store";

export const addStageReducer = (state: IAppState, 
    payload: StageType): IAppState => {
    const act = getAct(state);
    const newState = copyState(state);

    for (const stage of act.stages) {
        if (stage.name === payload.name) {
            return state;
        }
    }
    newState[state.currentPath][state.currentAct] = { stages: act.stages.concat(payload), ...act }

    return newState;
};