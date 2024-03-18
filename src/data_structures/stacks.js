export default class CustomStack {
    constructor() {
        this.stack = ["1", "2", "3"]
    }

    checkIndex(index, mode) {
        let limit = this.stack.length
        if (mode == "remove") {limit -= 1}
        if (index > limit) {
            throw `Index out of range. Please input an index from 0 to ${limit} only.`
        }
    }
    
    show() {
        console.log(this.stack)
    }

    pop() {
        this.stack.pop()
        this.show()
    }

    push(value) {
        this.stack.push(value)
        this.show()
    }

    insert(value, index) {
        this.checkIndex(index, "remove")
        this.stack[index] = value
        this.show()
    }
}