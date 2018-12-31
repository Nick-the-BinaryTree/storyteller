import { copyState } from "./reducer.utils";
import { IAppState } from "../store-settings/store-types";

export const hideEditDialogReducer = (state: IAppState): IAppState => ({
    ...copyState(state), showDialogEditor: false
});

export const showEditCharacterFormReducer = (state: IAppState,
    payload: number): IAppState => ({
    ...copyState(state), currentCharacter: payload
});

export const showEditDialogReducer = (state: IAppState): IAppState => ({
    ...copyState(state), showDialogEditor: true
});

export const showEditStageFormReducer = (state: IAppState,
    payload: number): IAppState => ({
    ...copyState(state), currentStage: payload
});

export const showNewCharacterFormReducer = (state: IAppState): IAppState => ({
    ...copyState(state), currentCharacter: -1
});

export const showNewStageFormReducer = (state: IAppState): IAppState => ({
    ...copyState(state), currentStage: -1
});