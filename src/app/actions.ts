import { CharacterType, StageType } from './store';

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

export const addAct = () => ({ type: ADD_ACT }); // increments current path act by one
export const addCharacter = (payload: CharacterType) => ({ type: ADD_CHARACTER, payload });
export const addPath = (payload: string) => ({ type: ADD_PATH, payload }); // payload = pathName
export const addStage = (payload: StageType) => ({ type: ADD_STAGE, payload });
export const deleteAct = () => ({ type: DELETE_ACT }); // deletes current act from current path
export const deleteCharacter = (payload: string) => ({ type: DELETE_CHARACTER, payload }); // payload = character name
export const deletePath = () => ({ type: DELETE_PATH }); // deletes current path
export const deleteStage = (payload: string) => ({ type: EDIT_STAGE, payload }); // payload = stage name
export const editCharacter = (payload: CharacterType) => ({ type: EDIT_CHARACTER, payload });
export const editStage = (payload: StageType) => ({ type: EDIT_STAGE, payload });
export const switchAct = (payload: number) => ({ type: SWITCH_ACT, payload }); // payload = new act number
export const switchPath = (payload: string) => ({ type: SWITCH_PATH, payload }); // payload = new path name