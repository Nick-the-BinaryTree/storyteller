import { CharacterType, StageType } from "./store-settings/store-types";

export const ADD_ACT = 'ADD_ACT';
export const ADD_CHARACTER = 'ADD_CHARACTER';
export const ADD_CHARACTER_TO_STAGE = 'ADD_CHARACTER_TO_STAGE';
export const ADD_CHARACTERS_TO_STAGE = 'ADD_CHARACTERS_TO_STAGE';
export const ADD_PATH = 'ADD_PATH';
export const ADD_STAGE = 'ADD_STAGE';

export const DELETE_ACT = 'DELETE_ACT';
export const DELETE_CHARACTER = 'DELETE_CHARACTER';
export const DELETE_CHARACTER_FROM_STAGE = 'DELETE_CHARACTER_FROM_STAGE';
export const DELETE_PATH = 'DELETE_PATH';
export const DELETE_STAGE = 'DELETE_STAGE';

export const EDIT_CHARACTER = 'EDIT_CHARACTER';
export const EDIT_STAGE = 'EDIT_STAGE';

export const HIDE_EDIT_DIALOG = 'HIDE_EDIT_DIALOG';
export const SHOW_CHARACTER_SELECT = 'SHOW_CHARACTER_SELECT';
export const SHOW_EDIT_CHARACTER_FORM = 'SHOW_EDIT_CHARACTER_FORM';
export const SHOW_EDIT_DIALOG = 'SHOW_EDIT_DIALOG';
export const SHOW_EDIT_STAGE_FORM = 'SHOW_EDIT_STAGE_FORM';
export const SHOW_NEW_CHARACTER_FORM = 'SHOW_NEW_CHARACTER_FORM';
export const SHOW_NEW_STAGE_FORM = 'SHOW_ADD_NEW_STAGE_FORM';

export const SWITCH_ACT = 'SWITCH_ACT';
export const SWITCH_PATH = 'SWITCH_PATH';

export const addActActionCreator = () => ({ type: ADD_ACT }); // increments current path act by one
export const addCharacterActionCreator = (payload: CharacterType) => ({ type: ADD_CHARACTER, payload });
export const addCharacterToStageActionCreator = (payload: string) => ({ type: ADD_CHARACTER_TO_STAGE, payload }); // payload = character name
export const addCharactersToStageActionCreator = (payload: string) => ({ type: ADD_CHARACTERS_TO_STAGE, payload });
export const addPathActionCreator = (payload: string) => ({ type: ADD_PATH, payload }); // payload = pathName
export const addStageActionCreator = (payload: StageType) => ({ type: ADD_STAGE, payload });

export const deleteActActionCreator = () => ({ type: DELETE_ACT }); // deletes current act from current path
export const deleteCharacterActionCreator = () => ({ type: DELETE_CHARACTER });
export const deleteCharacterFromStageActionCreator = (payload: number) => ({ type: DELETE_CHARACTER_FROM_STAGE, payload }); // payload = character index
export const deletePathActionCreator = () => ({ type: DELETE_PATH }); // deletes current path
export const deleteStageActionCreator = () => ({ type: DELETE_STAGE });

export const editCharacterActionCreator = (payload: CharacterType) => ({ type: EDIT_CHARACTER, payload });
export const editStageActionCreator = (payload: StageType) => ({ type: EDIT_STAGE, payload });

export const hideEditDialogActionCreator = () => ({ type: HIDE_EDIT_DIALOG });
export const showCharacterSelectActionCreator = () => ({ type: SHOW_CHARACTER_SELECT });
export const showEditCharacterFormActionCreator = (payload: number) => ({ type: SHOW_EDIT_CHARACTER_FORM, payload }); // payload = character index
export const showEditDialogActionCreator = () => ({ type: SHOW_EDIT_DIALOG });
export const showEditStageFormActionCreator = (payload: number) => ({ type: SHOW_EDIT_STAGE_FORM, payload }); // payload = stage index
export const showNewCharacterFormActionCreator = () => ({ type: SHOW_NEW_CHARACTER_FORM });
export const showNewStageFormActionCreator = () => ({ type: SHOW_NEW_STAGE_FORM });

export const switchActActionCreator = (payload: number) => ({ type: SWITCH_ACT, payload }); // payload = new act number
export const switchPathActionCreator = (payload: string) => ({ type: SWITCH_PATH, payload }); // payload = new path name