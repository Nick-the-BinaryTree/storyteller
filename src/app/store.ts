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
            addActReducer(state);
        case ADD_CHARACTER:
            addCharacterReducer(state, action.payload);
        case ADD_PATH:
            addPathReducer(state, action.payload);
        case ADD_STAGE:
            addStageReducer(state, action.payload);
        case DELETE_ACT:
            deleteActReducer(state);
        case DELETE_CHARACTER:
            deleteCharacterReducer(state, action.payload);
        case DELETE_PATH:
            deletePathReducer(state, action.payload);
        case DELETE_STAGE:
            deleteStageReducer(state, action.payload);
        case EDIT_CHARACTER:
            editCharacterReducer(state, action.payload);
        case EDIT_STAGE:
            editStageReducer(state, action.payload);
        case SWITCH_ACT:
            switchActReducer(state, action.payload);
        case SWITCH_PATH:
            switchPathReducer(state, action.payload);
    }
    return INITIAL_STATE;
}