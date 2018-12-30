import { 
    ADD_ACT, ADD_CHARACTER, ADD_PATH, ADD_STAGE,
    DELETE_ACT, DELETE_CHARACTER, DELETE_PATH, DELETE_STAGE,
    EDIT_CHARACTER, EDIT_STAGE,
    SWITCH_ACT, SWITCH_PATH
    } from "./actions";
import { addActReducer, deleteActReducer, switchActReducer } from "./reducers/act-reducers";
import { addCharacterReducer, deleteCharacterReducer, editCharacterReducer } from "./reducers/character-reducers";
import { addPathReducer, deletePathReducer, switchPathReducer } from "./reducers/path-reducers";
import { addStageReducer, deleteStageReducer, editStageReducer } from "./reducers/stage-reducers";
import { IAppState } from "./store-settings/store-types";
import { INITIAL_STATE } from "./store-settings/store-defaults";

export function rootReducer(state: IAppState, 
    action: {type: string, payload: any}): IAppState {
    switch (action.type) {
        case ADD_ACT:
            return addActReducer(state);
        case ADD_CHARACTER:
            return addCharacterReducer(state, action.payload);
        case ADD_PATH:
            return addPathReducer(state, action.payload);
        case ADD_STAGE:
            return addStageReducer(state, action.payload);
        case DELETE_ACT:
            return deleteActReducer(state);
        case DELETE_CHARACTER:
            return deleteCharacterReducer(state, action.payload);
        case DELETE_PATH:
            return deletePathReducer(state, action.payload);
        case DELETE_STAGE:
            return deleteStageReducer(state, action.payload);
        case EDIT_CHARACTER:
            return editCharacterReducer(state, action.payload);
        case EDIT_STAGE:
            return editStageReducer(state, action.payload);
        case SWITCH_ACT:
            return switchActReducer(state, action.payload);
        case SWITCH_PATH:
            return switchPathReducer(state, action.payload);
    }
    return INITIAL_STATE;
}