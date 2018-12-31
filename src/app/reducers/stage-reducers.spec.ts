import { copyState, getAct } from './reducer.utils';
import { addStageReducer, deleteStageReducer,
    editStageReducer } from './stage-reducers';
import { INITIAL_STATE } from '../store-settings/store-defaults';
import { IAppState } from '../store-settings/store-types';

const TEST_STAGE = {
    name: 'Field',
    backgroundImageURL: '',
    dialog: null
};
const TEST_NAME_TWO = 'Castle';
let state: IAppState;

describe('addStageReducer', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('adds a stage to an act on the default path', () => {
        const newState = addStageReducer(state, TEST_STAGE);
        const act = getAct(newState);

        expect(act.stages.length).toBe(1);
        expect(act.stages[0].name).toBe(TEST_STAGE.name);
        expect(newState.currentStage).toBe(0);
    });

    it('adds multiple stages to an act on the default path', () => {
        const newState = addStageReducer(
            addStageReducer(state, TEST_STAGE),
            { ...TEST_STAGE, name: TEST_NAME_TWO }
        );
        const act = getAct(newState);

        expect(act.stages.length).toBe(2);
        expect(act.stages[0].name).toBe(TEST_STAGE.name);
        expect(act.stages[1].name).toBe(TEST_NAME_TWO);
    });

    it('does not add the same stage twice', () => {
        const newState = addStageReducer(
            addStageReducer(state, TEST_STAGE),
            TEST_STAGE
        );
        const act = getAct(newState);

        expect(act.stages.length).toBe(1);
    });
});

describe('deleteStageReducer', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('deletes a stage from an act on the default path', () => {
        let newState = addStageReducer(state, TEST_STAGE);
        let act = getAct(newState);

        expect(act.stages.length).toBe(1);

        newState = deleteStageReducer(newState, TEST_STAGE.name);
        act = getAct(newState);

        expect(act.stages.length).toBe(0);
    });

    it('deletes multiple stages from an act on the default path', () => {
        let newState = addStageReducer(
            addStageReducer(state, TEST_STAGE),
            { ...TEST_STAGE, name: TEST_NAME_TWO }
        );
        let act = getAct(newState);

        expect(act.stages.length).toBe(2);

        newState = deleteStageReducer(
            deleteStageReducer(newState, TEST_NAME_TWO),
            TEST_STAGE.name
        );
        act = getAct(newState);

        expect(act.stages.length).toBe(0);
    });
});

describe('editStageReducer', () => {
    beforeEach(() => {
        state = copyState(INITIAL_STATE);
    });

    it('does not edit a non-existent stage', () => {
        let newState = editStageReducer(state, TEST_STAGE);

        expect(newState).toEqual(state);
    });

    it('edits an existing state', () => {
        const fakeImgURL = 'https://hi.jpg';
        let newState = addStageReducer(state, TEST_STAGE);
        let act = getAct(newState);

        expect(act.stages[0].backgroundImageURL).toBe('');

        newState = editStageReducer(newState,
            { ...TEST_STAGE, backgroundImageURL: fakeImgURL });
        act = getAct(newState);

        expect(act.stages[0].backgroundImageURL).toBe(fakeImgURL);
    });
});