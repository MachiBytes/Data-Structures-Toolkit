const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const fontFamily = "Short Stack"

class Cell {
    constructor(value, x, y) {
        // index, value, x, y
        this.value = value
        this.x = x
        this.y = y
    }
    draw() {
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = `36px ${fontFamily}`
        ctx.fillText(this.value, this.x + 50, this.y + 50)
        ctx.rect(this.x, this.y, 100, 100);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}


export default class CustomStack {
    constructor() {
        this.stack = ["1", "2", "3"]
        this.components = []
        this.populate()
        console.log(this.stack, this.components)
    }

    populate() {
        let baseX = 750
        let baseY = 300
        for (let i=0; i<this.stack.length; i++) {
            this.components[i] = new Cell(
                this.stack[i]==undefined ? "" : this.stack[i],
                baseX,
                baseY - (110 * i)
            )
        }
    }

    checkIndex(index) {
        let limit = this.stack.length - 1
        if (index > limit) {
            throw `Index out of range. Please input an index from 0 to ${limit} only.`
        }
    }
    
    show() {
        console.log(this.components)
        for (let i=0; i<this.stack.length; i++) {
            console.log(i)
            let value = this.stack[i]==undefined ? "" : this.stack[i]
            this.components[i].value = value
        }
    }

    clear() {
        this.stack = [undefined]
        this.components = []
        this.populate()
        this.show()
    }

    pop() {
        this.stack.pop()
        this.components.pop()
        if (this.stack.length==0) {
            this.stack.push(undefined)
            this.populate()
        }
        this.show()
    }

    push(value) {
        if (this.stack[0] == undefined) {
            this.stack[0] = value
            this.components[0].value = value
            return
        }
        this.stack.push(value)
        // Create a new cell from the position of the last cell
        let lastIndex = this.components.length-1
        let baseX = this.components[lastIndex].x
        let baseY = this.components[lastIndex].y
        this.components.push(new Cell(
            value,
            baseX,
            baseY - 110
        ))
        this.show()
    }

    insert(value, index) {
        this.checkIndex(index)
        this.stack[index] = value
        this.components[index].value = value
        this.show()
    }
}