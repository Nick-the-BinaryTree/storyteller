import { addCharacterReducer, addCharacterToStageReducer,
    deleteCharacterReducer, editCharacterReducer, deleteCharacterFromStageReducer, 
    } from './character-reducers';
import { copyState, getAct } from './reducer.utils';
import { TEST_INITIAL_STATE, TEST_CHARACTER, TEST_STAGE, TEST_DEFAULT_ACT } from '../store-settings/store-defaults';
import { IAppState } from '../store-settings/store-types';

import { addStageReducer } from './stage-reducers';

const TEST_NAME_TWO = 'Gregory';
let state: IAppState;

describe('addCharacterReducer', () => {
    beforeEach(() => {
        state = copyState(TEST_INITIAL_STATE);
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
        state = copyState(TEST_INITIAL_STATE);
    });

    it('adds a character to a stage', () => {
        let newState = copyState(state);
        // simulate editing stage
        newState.currentStage = 1;
        newState = addCharacterToStageReducer(newState, TEST_CHARACTER.name);

        const stage = getAct(newState).stages[newState.currentStage];
        
        expect(stage.characters.length).toBe(1);
        expect(stage.characters[0]).toBe(TEST_CHARACTER.name);
    });
});

describe('deleteCharacterReducer', () => {
    beforeEach(() => {
        state = copyState(TEST_INITIAL_STATE);
    });

    it('deletes a character from an act on the default path', () => {
        let newState = addCharacterReducer(state, TEST_CHARACTER);

        expect(newState.characters.length).toBe(1);

        newState.currentCharacter = 0;
        newState = deleteCharacterReducer(newState);

        expect(newState.characters.length).toBe(0);
    });

    it('deletes multiple characters from an act on the default path', () => {
        let newState = addCharacterReducer(
            addCharacterReducer(state, TEST_CHARACTER),
            { ...TEST_CHARACTER, name: TEST_NAME_TWO }
        );

        expect(newState.characters.length).toBe(2);
        
        for (let i=newState.characters.length-1; i>=0; i--) {
            newState.currentCharacter = i;
            newState = deleteCharacterReducer(newState);
        }

        expect(newState.characters.length).toBe(0);
    });

    it('deletes a character from all acts including the character', () => {
        let newState = addCharacterReducer(state, TEST_CHARACTER);

        // add to two stages in same act
        newState.currentStage = 1;
        newState = addCharacterToStageReducer(newState, TEST_CHARACTER.name);
        
        // add to next act
        newState.currentAct = 1;
        newState.currentStage = 0;
        newState.paths.default.push(TEST_DEFAULT_ACT);

        // add to different path
        newState.paths['alt'] = [ TEST_DEFAULT_ACT ];

        // prime reducer for removal
        newState.currentCharacter = 0;

        newState = deleteCharacterReducer(newState);

        expect(newState.characters.length).toBe(0);
        expect(newState.paths.alt[0].stages[0].characters.length).toBe(1);
        expect(newState.paths.default[0].stages[0].characters.length).toBe(1);
        expect(newState.paths.default[0].stages[1].characters.length).toBe(0);
        expect(newState.paths.default[1].stages[0].characters.length).toBe(1);
    });
});

describe('deleteCharacterFromStageReducer', () => {
    beforeEach(() => {
        state = copyState(TEST_INITIAL_STATE);
    });

    it('deletes a character from a stage', () => {
        let newState = copyState(state);
        // simulate editing stage
        newState.currentStage = 0;
        newState = deleteCharacterFromStageReducer(newState, 1);

        const characters = getAct(newState).stages[newState.currentStage].characters;
        
        expect(characters.length).toBe(1);
        expect(characters[0]).toBe(TEST_CHARACTER.name);
    });
});

describe('editCharacterReducer', () => {
    beforeEach(() => {
        state = copyState(TEST_INITIAL_STATE);
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