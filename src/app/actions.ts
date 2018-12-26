import { FourTree } from "src/data-structures/four-tree";
import { CharacterType, StageType } from './store';

export const ADD_CHARACTER = 'ADD_CHARACTER';
export const ADD_STAGE = 'ADD_STAGE';
export const EDIT_CHARACTER = 'EDIT_CHARACTER';
export const EDIT_STAGE_BACKGROUND = 'EDIT_STAGE_BACKGROUND';
export const EDIT_STAGE_DIALOG = 'EDIT_STAGE_DIALOG';
export const EDIT_STAGE_MUSIC = 'EDIT_STAGE_MUSIC';

export const addCharacter = (payload: CharacterType) => ({ type: ADD_CHARACTER, payload });
export const addStage = (payload: StageType) => ({ type: ADD_STAGE, payload });
export const editCharacter = (payload: CharacterType) => ({ type: EDIT_CHARACTER, payload });
export const editStageBackground = (payload: string) => ({ type: EDIT_STAGE_BACKGROUND, payload });
export const editStageDialog = (payload: FourTree) => ({ type: EDIT_STAGE_DIALOG, payload });
export const editStageMusic = (payload: string) => ({ type: EDIT_STAGE_MUSIC, payload });