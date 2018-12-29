import { addCharacterReducer, deleteCharacterReducer,
    editCharacterReducer } from './character-reducers';
import { copyState, getAct } from './reducer.utils';
import { IAppState, INITIAL_STATE } from '../store';

const TEST_CHARACTER = {
    name: 'Mortimore',
    defaultImageURL: '',
    moodImageURLs: {}
};
const TEST_NAME_TWO = 'Gregory';
let state: IAppState;

describe('addCharacterReducer', () => {
    beforeEach(() => {
        state = INITIAL_STATE;
    });

    it('adds a character to an act on the default path', () => {
        const newState = addCharacterReducer(state, TEST_CHARACTER);
        const act = getAct(newState);

        expect(act.characters.length).toBe(1);
        expect(act.characters[0].name).toBe('Mortimore');
    });

    it('adds multiple characters to an act on the default path', () => {
        const newState = addCharacterReducer(
            addCharacterReducer(state, TEST_CHARACTER),
            // ordering of this spread matters for override
            { ...TEST_CHARACTER, name: TEST_NAME_TWO }
        );
        const act = getAct(newState);

        expect(act.characters.length).toBe(2);
        expect(act.characters[0].name).toBe('Mortimore');
        expect(act.characters[1].name).toBe(TEST_NAME_TWO);
    });

    it('does not add the same character name twice', () => {
        const newState = addCharacterReducer(
            addCharacterReducer(state, TEST_CHARACTER),
            TEST_CHARACTER
        );
        const act = getAct(newState);

        expect(act.characters.length).toBe(1);
    });
});

describe('deleteCharacterReducer', () => {
    let state: IAppState;

    beforeEach(() => {
        state = INITIAL_STATE;
    });

    it('deletes a character from an act on the default path', () => {
        let newState = addCharacterReducer(state, TEST_CHARACTER);
        let act = getAct(newState);

        expect(act.characters.length).toBe(1);
        expect(act.characters[0].name).toBe('Mortimore');

        newState = deleteCharacterReducer(newState, TEST_CHARACTER.name);
        act = getAct(newState);

        expect(act.characters.length).toBe(0);
    });

    it('deletes multiple characters from an act on the default path', () => {
        let newState = addCharacterReducer(
            addCharacterReducer(state, TEST_CHARACTER),
            { ...TEST_CHARACTER, name: TEST_NAME_TWO }
        );
        let act = getAct(newState);

        expect(act.characters.length).toBe(2);
        
        newState = deleteCharacterReducer(
            deleteCharacterReducer(newState, TEST_CHARACTER.name),
            TEST_NAME_TWO
        );
        act = getAct(newState);

        expect(act.characters.length).toBe(0);
    });
});

describe('editCharacterReducer', () => {
    let state: IAppState;

    beforeEach(() => {
        state = INITIAL_STATE;
    });

    it('does not edit a non-existent character', () => {
        let newState = addCharacterReducer(state, TEST_CHARACTER);
        let act = getAct(newState);

        expect(act.characters[0].name).toBe('Mortimore');

        newState = editCharacterReducer(newState,
            { ...TEST_CHARACTER, name: 'Gregory' });
        act = getAct(newState);
        
        expect(act.characters[0].name).toBe('Mortimore');
    });

    it('edits an existing character', () => {
        const fakeImgURL = 'https://hi.jpg';
        let newState = addCharacterReducer(state, TEST_CHARACTER);
        let act = getAct(newState);

        expect(act.characters[0].defaultImageURL).toBe('');

        newState = editCharacterReducer(newState,
            { ...TEST_CHARACTER, defaultImageURL: fakeImgURL });
        act = getAct(newState);
        
        expect(act.characters[0].defaultImageURL).toBe(fakeImgURL);
    });
});