import { addActReducer, deleteActReducer, 
    switchActReducer } from './act-reducers';
import { copyState } from './reducer.utils'
import { DEFAULT_ACT, TEST_DEFAULT_ACT, TEST_INITIAL_STATE } from '../store-settings/store-defaults';
import { IAppState } from '../store-settings/store-types';

const TEST_STATE = { 
    ...TEST_INITIAL_STATE,
    paths: {
        ...TEST_INITIAL_STATE.paths,
        alt: []
    },
};
let state: IAppState;

describe('addActReducer', () => {
    beforeEach(() => {
        state = copyState(TEST_STATE);
    });

    it('adds an act to the default path', () => {
        const newState = addActReducer(state);

        expect(newState.paths.default.length).toBe(2);
        expect(newState.paths.default[1]).toEqual(TEST_DEFAULT_ACT);
        expect(newState.paths.default[2]).toBeUndefined();
    });

    it('adds two acts to the default path', () => {
        const newState = addActReducer(addActReducer(state));

        expect(newState.paths.default.length).toBe(3);
        expect(newState.paths.default[3]).toBeUndefined();
    });

    it('adds an act to an alternative path,', () => {
        let newState = copyState(state);
        
        newState.currentPath = 'alt';
        newState = addActReducer(newState);

        expect(newState.paths.alt.length).toBe(1);
        expect(newState.paths.alt[0]).toEqual(DEFAULT_ACT);
        expect(newState.paths.alt[1]).toBeUndefined();
    });
});

describe('deleteActReducer', () => {
    let state: IAppState;

    beforeEach(() => {
        state = copyState(TEST_STATE);
    });

    it('deletes an act from the default path', () => {
        let newState = addActReducer(state);

        expect(newState.paths.default.length).toBe(2);
        expect(newState.paths.default[1]).toEqual(TEST_DEFAULT_ACT);

        newState = deleteActReducer(newState);

        expect(newState.paths.default.length).toBe(1);
        expect(newState.paths.default[1]).toBeUndefined();
    });

    it('deletes two acts from the default path', () => {
        let newState = addActReducer(addActReducer(state));

        expect(newState.paths.default.length).toBe(3);
        expect(newState.paths.default[3]).toBeUndefined();

        newState = deleteActReducer(newState);
        expect(newState.paths.default.length).toBe(2);
        expect(newState.paths.default[2]).toBeUndefined();

        newState = deleteActReducer(newState);
        expect(newState.paths.default.length).toBe(1);
        expect(newState.paths.default[1]).toBeUndefined();
    });

    it('deletes an act from an alternative path,', () => {
        let newState = copyState(state);
        
        newState.currentPath = 'alt';
        newState = deleteActReducer(addActReducer(newState));

        expect(newState.paths.alt.length).toBe(0);
        expect(newState.paths.alt[1]).toBeUndefined();
    });
});

describe('switchActReducer', () => {
    let state: IAppState;

    beforeEach(() => {
        state = copyState(TEST_STATE);
    });

    it('does not switch to non-existent act', () => {
        const newState = switchActReducer(state, 1);

        expect(newState).toEqual(state);
    });

    it('switches acts on default path', () => {
        let newState = addActReducer(addActReducer(addActReducer(state)));

        expect(newState.paths.default.length).toBe(4);
        expect(newState.currentAct).toBe(3);

        newState = switchActReducer(newState, 0);
        expect(newState.currentAct).toBe(0);

        newState = switchActReducer(newState, 1);
        expect(newState.currentAct).toBe(1);
    });

    it('switches acts on alternative path,', () => {
        let newState = copyState(state);
        
        newState.currentPath = 'alt';
        newState = addActReducer(addActReducer(newState));

        expect(newState.paths.alt.length).toBe(2);
        expect(newState.currentAct).toBe(1);

        newState = switchActReducer(newState, 0);
        expect(newState.currentAct).toBe(0);
    });
});
