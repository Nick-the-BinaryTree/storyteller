import { copyState } from "./reducer.utils";
import { TEST_INITIAL_STATE } from "../store-settings/store-defaults";
import { IAppState } from "../store-settings/store-types";
import { 
    hideEditDialogReducer, 
    showCharacterSelectReducer, showEditDialogReducer,
    showEditCharacterFormReducer, showEditStageFormReducer, 
    showNewCharacterFormReducer, showNewStageFormReducer, hideCharacterSelectReducer, hideEditCharacterFormReducer, hideEditStageFormReducer,
} from "./interface-reducers";

let state: IAppState;

describe('Interface Reducers', () => {
    beforeEach(() => {
        state = copyState(TEST_INITIAL_STATE);
    });

    it('hides the character select and character editor when character select is closed', () => {
        let newState = showCharacterSelectReducer(
            showEditCharacterFormReducer(state, 1)
        );

        expect(newState.showCharacterSelect).toBe(true);
        expect(newState.currentCharacter).toBe(1);

        newState = hideCharacterSelectReducer(state);

        expect(newState.showCharacterSelect).toBe(false);
        expect(newState.currentCharacter).toBeNull();
    });

    it('hides the character editor', () => {
        let newState = showEditCharacterFormReducer(state, 1);

        expect(newState.currentCharacter).toBe(1);

        newState = hideEditCharacterFormReducer(state);

        expect(newState.currentCharacter).toBeNull();
    });

    it('hides the dialog editor', () => {
        let newState = showEditDialogReducer(state);

        expect(newState.showDialogEditor).toBe(true);

        newState = hideEditDialogReducer(state);
        
        expect(newState.showDialogEditor).toBe(false);
    });

    it('hides all windows except stage select when stage editor is closed', () => {
        let newState = showEditStageFormReducer(
            showEditDialogReducer(
                showCharacterSelectReducer(
                    showEditCharacterFormReducer(state, 0)
                )
            ), 0
        );

        expect(newState.currentStage).toBe(0);
        expect(newState.showDialogEditor).toBe(true);
        expect(newState.showCharacterSelect).toBe(true);
        expect(newState.currentCharacter).toBe(0);

        newState = hideEditStageFormReducer(state);

        expect(newState.currentStage).toBe(null);
        expect(newState.showDialogEditor).toBe(false);
        expect(newState.showCharacterSelect).toBe(false);
        expect(newState.currentCharacter).toBe(null);
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