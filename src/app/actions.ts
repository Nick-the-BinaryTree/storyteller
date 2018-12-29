import { CharacterType, StageType } from "./store-settings/store-types";

export const ADD_ACT = 'ADD_ACT';
export const ADD_CHARACTER = 'ADD_CHARACTER';
export const ADD_PATH = 'ADD_PATH';
export const ADD_STAGE = 'ADD_STAGE';
export const DELETE_ACT = 'DELETE_ACT';
export const DELETE_CHARACTER = 'DELETE_CHARACTER';
export const DELETE_PATH = 'DELETE_PATH';
export const DELETE_STAGE = 'DELETE_STAGE';
export const EDIT_CHARACTER = 'EDIT_CHARACTER';
export const EDIT_STAGE = 'EDIT_STAGE';
export const SWITCH_ACT = 'SWITCH_ACT';
export const SWITCH_PATH = 'SWITCH_PATH';

export const addActActionCreator = () => ({ type: ADD_ACT }); // increments current path act by one
export const addCharacterActionCreator = (payload: CharacterType) => ({ type: ADD_CHARACTER, payload });
export const addPathActionCreator = (payload: string) => ({ type: ADD_PATH, payload }); // payload = pathName
export const addStageActionCreator = (payload: StageType) => ({ type: ADD_STAGE, payload });
export const deleteActActionCreator = () => ({ type: DELETE_ACT }); // deletes current act from current path
export const deleteCharacterActionCreator = (payload: string) => ({ type: DELETE_CHARACTER, payload }); // payload = character name
export const deletePathActionCreator = () => ({ type: DELETE_PATH }); // deletes current path
export const deleteStageActionCreator = (payload: string) => ({ type: EDIT_STAGE, payload }); // payload = stage name
export const editCharacterActionCreator = (payload: CharacterType) => ({ type: EDIT_CHARACTER, payload });
export const editStageActionCreator = (payload: StageType) => ({ type: EDIT_STAGE, payload });
export const switchActActionCreator = (payload: number) => ({ type: SWITCH_ACT, payload }); // payload = new act number
export const switchPathActionCreator = (payload: string) => ({ type: SWITCH_PATH, payload }); // payload = new path name