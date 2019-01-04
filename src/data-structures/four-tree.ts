export type FourTreeNodeType = {
    dialog: string,
    index: number,
    mood: string,
    nextAct: boolean,
    speaker: string
};
export type FourTreeArrayType = Array<FourTreeNodeType>;

export const createFourTreeNode = (dialog: string, mood: string, 
    nextAct: boolean, speaker: string) => ({
    dialog, index: null, mood, nextAct, speaker
});

export class FourTree {
    arr: FourTreeArrayType = [];

    constructor() { }

    add(i: number, n: FourTreeNodeType): number {
        if (i === 0 && this.arr[i] == null) {
            this.arr = [{ ...n, index: 0 }, null, null, null, null];
            return;
        }
        const j = this.firstFreeKid(i);

        if (j == null) {
            return null;
        }
        this.arr[j] = n;
        n.index = j;

        const newRequiredLength = this.kthChild(j, 4);

        while (this.arr.length < newRequiredLength) {
            this.arr.push(null);
        }

        return j;
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

    getChildNodes(n: FourTreeNodeType): Array<FourTreeNodeType> {
        const res = [];

        for (let k=1; k<=4; k++) {
            const kid = this.get(this.kthChild(n.index, k));

            if (kid != null) {
                res.push(kid);
            }
        }
        return res;
    }

    hasChildNodes(n: FourTreeNodeType): boolean {
        return this.getChildNodes(n).length !== 0;
    }

    kthChild(i: number, k: number) {
        return i*4+k;
    }

    remove(i: number) {
        if (i === 0) {
            this.arr = [];
            return;
        }

        const removeHelper = (i: number): Array<number> => {
            let res = [i];

            for (let k=1; k<=4; k++) {
                let j = this.kthChild(i, k);

                if (j < this.arr.length && this.arr[j] != null) {
                    res = res.concat(removeHelper(j));
                }
            }
            return res;
        }
        const toRemove = removeHelper(i);

        for (let removeIndex of toRemove) {
            this.arr[removeIndex] = null;
        }
    }
}