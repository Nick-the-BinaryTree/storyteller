import { FourTree } from "src/data-structures/four-tree";

export interface IAppState {
    // each narrative path is an array of acts
    characters: Array<CharacterType>,
    currentAct: number,
    currentCharacter: number,
    currentPath: string,
    currentStage: number;
    paths: {
        [path: string]: PathType
    },
    showDialogEditor: boolean
}

export type ActType = {
    stages: Array<StageType>
};

export type CharacterType = {
    name: string,
    defaultImageURL: string,
    moodImageURLs: { [key: string]: string } // string key and value
};

export type PathType = Array<ActType>;

export type StageType = {
    name: string,
    backgroundImageURL: string,
    characters: Array<string>, // array of character names
    dialog: FourTree
};