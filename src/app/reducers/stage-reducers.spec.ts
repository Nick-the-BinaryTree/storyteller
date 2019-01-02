import { copyState } from './reducer.utils';
import { addStageReducer, deleteStageReducer,
    editStageReducer } from './stage-reducers';
import { TEST_INITIAL_STATE, TEST_STAGE, TEST_STAGE_2 } from '../store-settings/store-defaults';
import { IAppState } from '../store-settings/store-types';
import { getAct } from '../global-utils/state-utils';

let state: IAppState;

describe('addStageReducer', () => {
    beforeEach(() => {
        state = copyState(TEST_INITIAL_STATE);
    });

    it('adds a stage to an act on the default path', () => {
        let newState = copyState(state);
        // simulate new act
        newState.currentAct = 1;
        newState.paths.default.push({ stages: [] });
        newState = addStageReducer(newState, TEST_STAGE);

        let act = getAct(newState);

        expect(act.stages.length).toBe(1);
        expect(act.stages[0].name).toBe(TEST_STAGE.name);
    });

    it('adds multiple stages to an act on the default path', () => {
        let newState = copyState(state);
        // simulate new act
        newState.currentAct = 1;
        newState.paths.default.push({ stages: [] });

        newState = addStageReducer(
            addStageReducer(newState, TEST_STAGE),
            TEST_STAGE_2
        );
        const act = getAct(newState);

        expect(act.stages.length).toBe(2);
        expect(act.stages[0].name).toBe(TEST_STAGE.name);
        expect(act.stages[1].name).toBe(TEST_STAGE_2.name);
    });

    it('does not add the same stage twice', () => {
        const newState = addStageReducer(
            addStageReducer(state, TEST_STAGE),
            TEST_STAGE
        );
        const act = getAct(newState);

        expect(act.stages.length).toBe(2);
    });
});

describe('deleteStageReducer', () => {
    beforeEach(() => {
        state = copyState(TEST_INITIAL_STATE);
    });

    it('deletes a stage from an act on the default path', () => {
        let newState = addStageReducer(state, TEST_STAGE);
        let act = getAct(newState);

        expect(act.stages.length).toBe(2);

        newState.currentStage = 0;
        newState = deleteStageReducer(newState);
        act = getAct(newState);

        expect(act.stages.length).toBe(1);
    });

    it('deletes multiple stages from an act on the default path', () => {
        let newState = copyState(state);
        let act = getAct(newState);

        expect(act.stages.length).toBe(2);

        for (let i=act.stages.length-1; i>=0; i--) {
            newState.currentStage = i;
            newState = deleteStageReducer(newState);
        }

        act = getAct(newState);

        expect(act.stages.length).toBe(0);
    });
});

describe('editStageReducer', () => {
    beforeEach(() => {
        state = copyState(TEST_INITIAL_STATE);
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