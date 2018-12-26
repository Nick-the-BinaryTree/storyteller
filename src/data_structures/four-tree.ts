export type FourTreeNodeType = {
    dialog: string,
    mood: string,
    nextAct: boolean,
    speaker: string
};
export type FourTreeArrayType = Array<FourTreeNodeType>;

export const createFourTreeNode = (dialog: string, mood: string, 
    nextAct: boolean, speaker: string) => ({
    dialog, mood, nextAct, speaker
});

const fourNulls = [null, null, null, null];

export class FourTree {
    arr: FourTreeArrayType = [];

    constructor() { }

    add(i: number, n: FourTreeNodeType) {
        if (i === 0) {
            this.arr = [n].concat(fourNulls);
            return;
        }
        const j = this.firstFreeKid(i);

        if (j == null) {
            return;
        }

        this.arr[j] = n;

        if (this.kthChild(j, 4) >= this.arr.length) {
            this.arr.concat(fourNulls);
        }
    }

    firstFreeKid(i: number): number {
        for (let k=1; k <= 4; k++) {
            const j = this.kthChild(i, k);

            if (j < this.arr.length && this.arr[j] == null) {
                return j;
            }
        }
        return null;
    }

    get(i: number): FourTreeNodeType {
        return this.arr[i];
    }

    kthChild(i: number, k: number) {
        return i*4+k;
    }

    remove(i: number) {
        if (i === 0) {
            this.arr = [];
            return;
        }
        const toRemove = [];

        const removeHelper = (i: number): Array<number> => {
            const res = [i];

            for (let k=1; k<=4; k++) {
                let j = this.kthChild(i, k);

                if (j < this.arr.length && this.arr[j] != null) {
                    res.concat(removeHelper(j));
                }
            }
            return res;
        }
        toRemove.concat(removeHelper(i));

        for (let removeIndex of toRemove) {
            this.arr[removeIndex] = null;
        }
    }
}