class MinHeap {

    #values = [];
    #data = [];


    get size(){
        return this.#values.length;
    }

    push(value, data) {
        this.#values.push(value);
        this.#data.push(data);
        this.#bubbleUp();
    }

    pop() {
        if(this.#values.length === 0) return null;

        const value = this.#values[0];
        const data = this.#data[0];

        const end = this.#values.pop();
        const endData = this.#data.pop();
        if (this.#values.length > 0) {
            this.#values[0] = end;
            this.#data[0] = endData;
            this.#sinkDown();
        }
        return { value, data };
    }

    peek() {
        if(this.#values.length === 0) return null;

        const value = this.#values[0];
        const data = this.#data[0];

        return { value, data }
    }

    print(){
        console.log(this.#values);
    }

    #hasChildren(idx) {
        return this.#getLeftChildIdx(idx) < this.#values.length;
    }

    #getParentIdx(idx) {
        return Math.floor((idx - 1) / 2);
    }

    #getLeftChildIdx(idx) {
        return idx * 2 + 1;
    }

    #getRightChildIdx(idx) {
        return idx * 2 + 2;
    }

    #getValue(idx) {
        return this.#values[idx];
    }

    #swap(idx1, idx2) {
        [this.#values[idx1], this.#values[idx2]] = [this.#values[idx2], this.#values[idx1]];
        [this.#data[idx1], this.#data[idx2]] = [this.#data[idx2], this.#data[idx1]];
    }

    // Bubble the last element up to its correct position
    #bubbleUp() {
        let idx = this.#values.length - 1;
        while(idx > 0) {
            const parentIdx = this.#getParentIdx(idx);
            if (this.#getValue(idx) < this.#getValue(parentIdx)) {
                this.#swap(idx, parentIdx);
                idx = parentIdx;
            } else {
                break;
            }
        }
    }

    // Sinks the first element down to its correct position
    #sinkDown() {
        let idx = 0;

        while(this.#hasChildren(idx)) {
            const leftChildIdx = this.#getLeftChildIdx(idx);
            const rightChildIdx = this.#getRightChildIdx(idx);

            const smallestChildIdx = this.#getValue(leftChildIdx) < (this.#getValue(rightChildIdx) ?? Infinity) ? leftChildIdx : rightChildIdx;

            if (this.#getValue(idx) > this.#getValue(smallestChildIdx)) {
                this.#swap(idx, smallestChildIdx);
                idx = smallestChildIdx;
                continue
            }

            break;
        } 
    }
}