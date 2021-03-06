import { ActType, IAppState } from "../store-settings/store-types";

export const copyAct = (act: ActType): ActType => JSON.parse(JSON.stringify(act));

export const copyState = (state: IAppState): IAppState => JSON.parse(JSON.stringify(state));