import { copyState } from "./reducer.utils";
import { INITIAL_STATE } from "../store-settings/store-defaults";
import { IAppState } from "../store-settings/store-types";
import { 
    hideEditDialogReducer, 
    showCharacterSelectReducer, showEditDialogReducer,
    showEditCharacterFormReducer, showEditStageFormReducer, 
    showNewCharacterFormReducer, showNewStageFormReducer,
} from "./interface-reducers";

let state: IAppState;

describe('Interface Reducers', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('hides the dialog editor', () => {
        let newState = showEditDialogReducer(state);

        expect(newState.showDialogEditor).toBe(true);

        newState = hideEditDialogReducer(state);
        
        expect(newState.showDialogEditor).toBe(false);
    });

    it('shows the character select', () => {
        let newState = showCharacterSelectReducer(state);

        expect(newState.showCharacterSelect).toBe(true);
    });

    it('shows the edit character form', () => {
        let newState = showEditCharacterFormReducer(state, 1);

        expect(newState.currentCharacter).toBe(1);
    });

    it('shows the dialog editor', () => {
        let newState = showEditDialogReducer(state);

        expect(newState.showDialogEditor).toBe(true);
    });

    it('shows the edit stage form', () => {
        let newState = showEditStageFormReducer(state, 1);

        expect(newState.currentStage).toBe(1);
    });

    it('shows the new character form', () => {
        let newState = showNewCharacterFormReducer(state);

        expect(newState.currentCharacter).toBe(-1);
    });

    it('shows the new stage form', () => {
        let newState = showNewStageFormReducer(state);

        expect(newState.currentStage).toBe(-1);
    });
});