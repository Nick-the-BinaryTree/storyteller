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

export class FourTree {
    arr: FourTreeArrayType = [];

    constructor() { }

    add(i: number, n: FourTreeNodeType) {
        if (i === 0 && this.arr[i] == null) {
            this.arr = [n, null, null, null, null];
            return;
        }
        const j = this.firstFreeKid(i);

        if (j == null) {
            return;
        }
        this.arr[j] = n;
        
        const newRequiredLength = this.kthChild(j, 4);

        while (this.arr.length < newRequiredLength) {
            this.arr.push(null);
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