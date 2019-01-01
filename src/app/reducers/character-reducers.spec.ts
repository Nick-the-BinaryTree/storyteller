import { addCharacterReducer, addCharacterToStageReducer,
    deleteCharacterReducer, editCharacterReducer, 
    } from './character-reducers';
import { copyState, getAct } from './reducer.utils';
import { INITIAL_STATE, TEST_CHARACTER, TEST_STAGE } from '../store-settings/store-defaults';
import { IAppState } from '../store-settings/store-types';

import { addStageReducer } from './stage-reducers';

const TEST_NAME_TWO = 'Gregory';
let state: IAppState;

describe('addCharacterReducer', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('adds a character', () => {
        const newState = addCharacterReducer(state, TEST_CHARACTER);

        expect(newState.characters.length).toBe(1);
        expect(newState.characters[0].name).toBe(TEST_CHARACTER.name);
    });

    it('adds multiple characters', () => {
        const newState = addCharacterReducer(
            addCharacterReducer(state, TEST_CHARACTER),
            // ordering of this spread matters for override
            { ...TEST_CHARACTER, name: TEST_NAME_TWO }
        );

        expect(newState.characters.length).toBe(2);
        expect(newState.characters[0].name).toBe(TEST_CHARACTER.name);
        expect(newState.characters[1].name).toBe(TEST_NAME_TWO);
    });

    it('does not add the same character name twice', () => {
        const newState = addCharacterReducer(
            addCharacterReducer(state, TEST_CHARACTER),
            TEST_CHARACTER
        );

        expect(newState.characters.length).toBe(1);
    });
});

describe('addCharacterToStageReducer', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('adds a character to a stage', () => {
        let newState = addCharacterReducer(
            addStageReducer(state, TEST_STAGE),
            TEST_CHARACTER
        );
        // simulate editing stage
        newState.currentStage = 0;
        newState = addCharacterToStageReducer(newState, TEST_CHARACTER.name);

        const stage = getAct(newState).stages[newState.currentStage];
        
        expect(stage.characters.length).toBe(1);
        expect(stage.characters[0]).toBe(TEST_CHARACTER.name);
    });
});

describe('deleteCharacterReducer', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('deletes a character from an act on the default path', () => {
        let newState = addCharacterReducer(state, TEST_CHARACTER);

        expect(newState.characters.length).toBe(1);

        newState = deleteCharacterReducer(newState, TEST_CHARACTER.name);

        expect(newState.characters.length).toBe(0);
    });

    it('deletes multiple characters from an act on the default path', () => {
        let newState = addCharacterReducer(
            addCharacterReducer(state, TEST_CHARACTER),
            { ...TEST_CHARACTER, name: TEST_NAME_TWO }
        );

        expect(newState.characters.length).toBe(2);
        
        newState = deleteCharacterReducer(
            deleteCharacterReducer(newState, TEST_CHARACTER.name),
            TEST_NAME_TWO
        );

        expect(newState.characters.length).toBe(0);
    });
});

describe('editCharacterReducer', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('does not edit a non-existent character', () => {
        let newState = addCharacterReducer(state, TEST_CHARACTER);

        expect(newState.characters[0].name).toBe(TEST_CHARACTER.name);

        newState = editCharacterReducer(newState,
            { ...TEST_CHARACTER, name: TEST_NAME_TWO });
        
        expect(newState.characters[0].name).toBe(TEST_CHARACTER.name);
    });

    it('edits an existing character', () => {
        const fakeImgURL = 'https://hi.jpg';
        let newState = addCharacterReducer(state, TEST_CHARACTER);

        expect(newState.characters[0].defaultImageURL).toBe('');

        newState = editCharacterReducer(newState,
            { ...TEST_CHARACTER, defaultImageURL: fakeImgURL });
        
        expect(newState.characters[0].defaultImageURL).toBe(fakeImgURL);
    });
});