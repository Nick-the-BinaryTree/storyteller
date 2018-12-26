import { FourTree } from './four-tree';

const TEST_NODE = {
    dialog: 'hi',
    mood: '',
    nextAct: false,
    speaker: 'Gerald'
};

describe('Four Tree test suite', () => {
    let t: FourTree;

    beforeEach(() => {
        t = new FourTree();
    });

    it('initializes with an empty tree', () => {
        expect(t.arr.length).toBe(0);
        expect(t.get(0)).toBeUndefined();
    });

    it('adds one node', () => {
        t.add(0, TEST_NODE);
        
        expect(t.get(0)).toBe(TEST_NODE)
    });
});