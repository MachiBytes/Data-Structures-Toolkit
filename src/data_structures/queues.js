export default class CustomQueue {
    constructor() {
        this.queue = ["1", "2", "3"]
    }

    checkIndex(index, mode) {
        let limit = this.queue.length
        if (mode == "remove") {limit -= 1}
        if (index > limit) {
            throw `Index out of range. Please input an index from 0 to ${limit} only.`
        }
    }
    
    show() {
        console.log(this.queue)
    }

    pop() {
        this.queue.splice(0, 1)
        this.show()
    }

    push(value) {
        this.queue.push(value)
        this.show()
    }

    get(index) {
        if (index==-1) {index = this.queue.length-1}
        console.log(this.queue[index])
    }
}