const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const fontFamily = "Short Stack"

class Cell {
    constructor(value, x, y, front, back) {
        // index, value, x, y
        this.value = value
        this.x = x
        this.y = y
        this.front = front
        this.back = back
    }
    draw() {
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = `36px ${fontFamily}`
        ctx.fillText(this.value, this.x + 50, this.y + 50)
        if (this.back) {
            ctx.font = `18px ${fontFamily}`
            ctx.fillText("BACK", this.x + 50, this.y + 120)
        }
        if (this.front) {
            ctx.font = `18px ${fontFamily}`
            ctx.fillText("FRONT", this.x + 50, this.y - 20)
        }
        ctx.rect(this.x, this.y, 100, 100);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}


export default class CustomQueue {
    constructor() {
        this.queue = [undefined]
        this.components = []
        this.populate()
        this.show()
    }

    populate() {
        let baseX = 400
        let baseY = 200
        for (let i=0; i<this.queue.length; i++) {
            this.components[i] = new Cell(
                this.queue[i]==undefined ? "" : this.queue[i],
                baseX + (110 * i),
                baseY,
                i==0,
                i==this.queue.length-1
            )
        }
    }

    checkIndex(index, mode) {
        let limit = this.queue.length
        if (mode == "remove") {limit -= 1}
        if (index > limit) {
            throw `Index out of range. Please input an index from 0 to ${limit} only.`
        }
    }
    
    show() {
        console.log(this.components)
        for (let i=0; i<this.queue.length; i++) {
            console.log(i)
            let value = this.queue[i]==undefined ? "" : this.queue[i]
            this.components[i].value = value
            if (i==0) {
                this.components[i].front = true
            }
            if (i!=this.queue.length-1) {
                this.components[i].back = false
            } else {
                this.components[i].back = true
            }
        }
    }

    clear() {
        console.log(this.queue)
        this.queue = [undefined]
        console.log(this.queue)
        this.components = []
        this.populate()
        this.show()
    }

    pop() {
        this.queue.splice(0, 1)
        this.components.splice(0,1)
        if (this.queue.length==0) {
            this.queue.push(undefined)
            this.populate()
        }
        this.show()
    }

    push(value) {
        if (this.queue[0] == undefined) {
            this.queue[0] = value
            this.components[0].value = value
            return
        }
        this.queue.push(value)
        // Create a new cell from the position of the last cell
        let lastIndex = this.components.length-1
        let baseX = this.components[lastIndex].x
        let baseY = this.components[lastIndex].y
        this.components.push(new Cell(
            value,
            baseX + 110,
            baseY
        ))
        this.show()
    }
}