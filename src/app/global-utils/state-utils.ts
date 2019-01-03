import { ActType, IAppState, MoodType, StageType } from "../store-settings/store-types";

export const getAct = (state: IAppState): ActType => (
    state.paths[state.currentPath][state.currentAct]
);

export const getMoods = (state: IAppState): MoodType => (
    state.currentCharacter != null &&
        state.characters[state.currentCharacter] != null
        ? state.characters[state.currentCharacter].moodImageURLs
        : null
);

export const  getStage = (state: IAppState): StageType => {
    const act = getAct(state);

    return state.currentStage != null && act != null ? act.stages[state.currentStage] : null;
}

export const  getStageCharacters = (state: IAppState): Array<string> => {
    const stage = getStage(state);

    return stage != null ? stage.characters : null;
}