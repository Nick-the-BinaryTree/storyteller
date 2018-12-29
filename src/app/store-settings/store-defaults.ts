import { IAppState } from "./store-types";
import { ActType } from "../reducers/act-reducers";

export const DEFAULT_ACT: ActType = { characters: [], stages: [] };
export const DEFAULT_PATH_NAME: string = 'default';

export const INITIAL_STATE: IAppState = {
    currentAct: 0,
    currentPath: 'default',
    paths: { 
        default: [ DEFAULT_ACT ]
    }
};