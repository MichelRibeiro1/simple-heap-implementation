class Heap {
    constructor(values = []) {
        this.nodes = values;
        this._buildHeap();
    }

    peek() {
        return this.nodes[0] || null;
    }

    poll() {
        const poll = this.nodes[0];
        if (!poll) return null;

        this.nodes[0] = this.nodes.pop();

        this._heapifyDown();

        return poll;
    }

    add(item) {
        if(typeof item === "number" && !isNaN(item)) {
            this.nodes.push(item);
            this._heapifyUp();
        }
    }


    _getParentIdx(idx) {
        return Math.floor((idx - 1) / 2);
    }

    _getParent(idx) {
        return this.nodes[this._getParentIdx(idx)];
    }

    _hasParent(idx) {
        return this._getParent(idx) >= 0;
    }

    _swap(parentIdx, childIdx) {
        [this.nodes[parentIdx], this.nodes[childIdx]] = [this.nodes[childIdx], this.nodes[parentIdx]]
    }

    _getLeftChild(idx) {
        return this.nodes[(idx * 2) + 1];
    }

    _getRightChild(idx) {
        return this.nodes[(idx * 2) + 2];
    }

    _getGreaterChildIdx(idx) {
        if (this._getLeftChild(idx) >= this._getRightChild(idx)) {
            return (idx * 2) + 1;
        } else {
            return (idx * 2) + 2;
        }
    }

    _hasChildren(idx) {
        return Boolean(this.nodes[(idx * 2) + 1]);
    }

    _heapifyUp() {
        let itemIdx = this.nodes.length - 1;
        const item = this.nodes[itemIdx];

        while (this._hasParent(itemIdx) && item > this._getParent(itemIdx)) {
            const parentIdx = this._getParentIdx(itemIdx);
            this._swap(parentIdx, itemIdx);
            itemIdx = parentIdx;
        }
    }

    _heapifyDown() {
        let greaterItemIdx = 0;
        while (this._hasChildren(greaterItemIdx)) {
            const greaterChildIdx = this._getGreaterChildIdx(greaterItemIdx);
            if (this.nodes[greaterChildIdx] > this.nodes[greaterItemIdx]) {
                this._swap(greaterItemIdx, greaterChildIdx);
                greaterItemIdx = greaterChildIdx;
            } else {
                break;
            }
        }
    }

    _buildHeap() {
        // let count = this.nodes.length;
        // while (count > 0) {
        //     this._heapifyDown();
        //     count -= 1;
        // }
    }

}

module.exports = Heap;
