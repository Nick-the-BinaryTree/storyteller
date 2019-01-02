import { 
    ADD_ACT, ADD_CHARACTER, ADD_CHARACTER_TO_STAGE, ADD_PATH, ADD_STAGE,
    DELETE_ACT, DELETE_CHARACTER, DELETE_CHARACTER_FROM_STAGE, DELETE_PATH, DELETE_STAGE,
    EDIT_CHARACTER, EDIT_STAGE,
    SHOW_EDIT_CHARACTER_FORM, SHOW_EDIT_DIALOG, SHOW_EDIT_STAGE_FORM,
    SHOW_NEW_CHARACTER_FORM, SHOW_NEW_STAGE_FORM,
    SWITCH_ACT, SWITCH_PATH, SHOW_CHARACTER_SELECT
    } from "./actions";
import { addActReducer, deleteActReducer, switchActReducer } from "./reducers/act-reducers";
import { addCharacterReducer, addCharacterToStageReducer, deleteCharacterReducer,
    deleteCharacterFromStageReducer, editCharacterReducer } from "./reducers/character-reducers";
import { addPathReducer, deletePathReducer, switchPathReducer } from "./reducers/path-reducers";
import { addStageReducer, deleteStageReducer, editStageReducer } from "./reducers/stage-reducers";
import { IAppState } from "./store-settings/store-types";
import { INITIAL_STATE } from "./store-settings/store-defaults";
import { 
    showCharacterSelectReducer, showEditCharacterFormReducer, showEditDialogReducer, 
    showEditStageFormReducer, showNewCharacterFormReducer, showNewStageFormReducer
} from "./reducers/interface-reducers";

export function rootReducer(state: IAppState, 
    action: {type: string, payload: any}): IAppState {
    switch (action.type) {
        case ADD_ACT:
            return addActReducer(state);
        case ADD_CHARACTER:
            return addCharacterReducer(state, action.payload);
        case ADD_CHARACTER_TO_STAGE:
            return addCharacterToStageReducer(state, action.payload);
        case ADD_PATH:
            return addPathReducer(state, action.payload);
        case ADD_STAGE:
            return addStageReducer(state, action.payload);
        case DELETE_ACT:
            return deleteActReducer(state);
        case DELETE_CHARACTER:
            return deleteCharacterReducer(state);
        case DELETE_CHARACTER_FROM_STAGE:
            return deleteCharacterFromStageReducer(state, action.payload);
        case DELETE_PATH:
            return deletePathReducer(state, action.payload);
        case DELETE_STAGE:
            return deleteStageReducer(state);
        case EDIT_CHARACTER:
            return editCharacterReducer(state, action.payload);
        case EDIT_STAGE:
            return editStageReducer(state, action.payload);
        case SHOW_CHARACTER_SELECT:
            return showCharacterSelectReducer(state);
        case SHOW_EDIT_CHARACTER_FORM:
            return showEditCharacterFormReducer(state, action.payload);
        case SHOW_EDIT_DIALOG:
            return showEditDialogReducer(state);
        case SHOW_EDIT_STAGE_FORM:
            return showEditStageFormReducer(state, action.payload);
        case SHOW_NEW_CHARACTER_FORM:
            return showNewCharacterFormReducer(state);
        case SHOW_NEW_STAGE_FORM:
            return showNewStageFormReducer(state);
        case SWITCH_ACT:
            return switchActReducer(state, action.payload);
        case SWITCH_PATH:
            return switchPathReducer(state, action.payload);
    }
    return INITIAL_STATE;
}