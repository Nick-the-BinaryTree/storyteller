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
        
        expect(t.arr.length).toBe(5); // make room for kids
        expect(t.get(0)).toBe(TEST_NODE);
    });

    it('adds six nodes', () => {
        t.add(0, TEST_NODE); // root
        t.add(0, TEST_NODE); // child 1
        t.add(0, TEST_NODE); // child 2
        t.add(0, TEST_NODE); // child 3
        t.add(0, TEST_NODE); // child 4
        t.add(1, TEST_NODE); // grandchild 1 of child 1

        expect(t.arr.length).toBe(24);
        expect(t.get(5)).toBe(TEST_NODE);
        expect(t.get(23)).toBe(null);
    });

    it('removes one node', () => {
        t.add(0, TEST_NODE);
        
        expect(t.arr.length).toBe(5);
        expect(t.get(0)).toBe(TEST_NODE);

        t.remove(0);

        expect(t.arr.length).toBe(0);
        expect(t.get(0)).toBeUndefined();
    });

    it('removes root node from multi-node tree', () => {
        t.add(0, TEST_NODE);
        t.add(0, TEST_NODE);

        expect(t.arr.length).toBe(8);

        t.remove(0);

        expect(t.arr.length).toBe(0);
        expect(t.get(0)).toBeUndefined();
    });

    it('removes three leaves then root', () => {
        t.add(0, TEST_NODE); // root
        t.add(0, TEST_NODE); // child 1
        t.add(0, TEST_NODE); // child 2
        t.add(0, TEST_NODE); // child 3
        t.add(0, TEST_NODE); // child 4
        t.add(1, TEST_NODE); // grandchild 1 of child 1

        expect(t.arr.length).toBe(24);

        expect(t.get(5)).toBe(TEST_NODE);
        t.remove(5);
        expect(t.get(5)).toBeNull();

        expect(t.get(4)).toBe(TEST_NODE);
        t.remove(4);
        expect(t.get(4)).toBeNull();

        expect(t.get(3)).toBe(TEST_NODE);
        t.remove(3);
        expect(t.get(3)).toBeNull();

        expect(t.arr.length).toBe(24);
        t.remove(0);
        expect(t.arr.length).toBe(0);
    });

    it('removes branch', () => {
        t.add(0, TEST_NODE); // root
        t.add(0, TEST_NODE); // child 1
        t.add(1, TEST_NODE); // grandchild 1 of child 1
        t.add(1, TEST_NODE); // grandchild 2 of child 1
        t.add(5, TEST_NODE); // great-grandchild 1 of child 1

        expect(t.arr.length).toBe(88);
        expect(t.get(1)).toBe(TEST_NODE);
        expect(t.get(5)).toBe(TEST_NODE);
        expect(t.get(21)).toBe(TEST_NODE);
        
        t.remove(1);

        expect(t.arr.length).toBe(88);
        expect(t.get(5)).toBe(null);
        expect(t.get(5)).toBe(null);
        expect(t.get(21)).toBe(null);
    });
});