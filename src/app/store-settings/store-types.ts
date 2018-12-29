import { FourTree } from "src/data-structures/four-tree";

export interface IAppState {
    // each narrative path is an array of acts
    currentAct: number,
    currentPath: string,
    paths: {
        [path: string]: PathType
    }
}

export type ActType = {
    characters: Array<CharacterType>,
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
    dialog: FourTree
};