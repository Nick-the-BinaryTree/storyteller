import { addPathReducer, deletePathReducer,
    switchPathReducer } from './path-reducers';
import { copyState } from './reducer.utils';
import { DEFAULT_ACT, DEFAULT_PATH_NAME, INITIAL_STATE } from '../store-settings/store-defaults';
import { IAppState } from '../store-settings/store-types';

const TEST_PATH_NAME = 'alt';
const EXPECTED_STATE: IAppState = {
    ...INITIAL_STATE,
    currentPath: TEST_PATH_NAME,
};

let state: IAppState;

describe('addPathReducer', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('adds a new path from initial state', () => {
        const newState = addPathReducer(state, TEST_PATH_NAME);

        expect(newState).toEqual({
            ...EXPECTED_STATE,
            paths: {
                default: [ DEFAULT_ACT ],
                [TEST_PATH_NAME]: [ DEFAULT_ACT ]
            }
        });
    });

    it('adds a new path that picks up from where old one left off', () => {
        // simulating two acts
        let newState = {...copyState(state), currentAct: 1};
        newState.paths.default.push(null);
        newState = addPathReducer(newState, TEST_PATH_NAME);

        expect(newState).toEqual({
            ...EXPECTED_STATE,
            paths: {
                default: [ DEFAULT_ACT, null ],
                [TEST_PATH_NAME]: [ null ]
            }
        });
    });
});

describe('deletePathReducer', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('does not delete the default path', () => {
        const newState = deletePathReducer(state, DEFAULT_PATH_NAME);

        expect(newState).toEqual(state);
    });

    it('deletes an alternative path', () => {
        const newState = deletePathReducer(
            addPathReducer(state, TEST_PATH_NAME),
            TEST_PATH_NAME
        );

        expect(newState).toEqual(state);
    });
});

describe('switchPathReducer', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('does not switch to a non-existent path', () => {
        const newState = switchPathReducer(state, TEST_PATH_NAME);

        expect(newState).toEqual(state);
    });

    it('switches paths', () => {
        const newState = switchPathReducer(
            addPathReducer(state, TEST_PATH_NAME),
            TEST_PATH_NAME
        );

        expect(newState.currentAct).toBe(0);
        expect(newState.currentPath).toBe(TEST_PATH_NAME);
        expect(newState.paths).toEqual(jasmine.objectContaining({
            [TEST_PATH_NAME]: [ DEFAULT_ACT ]
        }));
    });
});