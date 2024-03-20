const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const fontFamily = "Short Stack"

class Cell {
    constructor(index, value, x, y) {
        // index, value, x, y
        this.index = index
        this.value = value
        this.x = x
        this.y = y
        this.isNull=false
        this.hasArrow=true
        if (value == "head") {
            this.isNull = true
            this.hasArrow = true
        } else if (value == "null") {
            this.isNull = true
            this.hasArrow = false
        }
    }
    canvas_arrow(fromx, fromy, tox, toy) {
        var headlen = 10; // length of head in pixels
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    }
    draw() {
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = `36px ${fontFamily}`
        ctx.fillText(this.value, this.x + 50, this.y + 50)

        if (!this.isNull) {
            ctx.font = `18px ${fontFamily}`
            ctx.fillText(this.index, this.x + 50, this.y - 20)
            ctx.rect(this.x, this.y, 100, 100);
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        this.canvas_arrow(this.x + 100, this.y + 50, this.x + 130, this.y + 50)
    }
}


class Node {
    constructor(value, next=null) {
        this.value = value
        this.next = next
    }
}

export default class CustomLinkedList {
    constructor() {
        this.head = new Node("head")
        this.length = 6
        this.head.next = new Node("1", new Node("2", new Node("3", new Node("4", new Node("5", new Node("6"))))))
        this.components = [new Cell(0, "head", 400, 300)]
        this.populate()
    }

    populate() {
        let baseX = 400
        let baseY = 300
        let currNode = this.head
        for (var i=1; i<this.length+1; i++) {
            currNode = currNode.next
            this.components.push(new Cell(
                i-1,
                currNode.value,
                baseX + (130 * i),
                baseY
            ))
        }
    }

    checkIndex(index, mode) {
        let limit = this.length
        if (mode == "remove") {limit -= 1}
        if (index > limit) {
            throw `Index out of range. Please input an index from 0 to ${limit} only.`
        }
    }

    show() {
        this.components = [new Cell(0, "head", 400, 300)]
        this.populate()
    }

    clear() {
        this.head = new Node("head")
        this.length = 0
        this.components = [new Cell(0, "head", 400, 300)]
        this.populate()
    }

    insert(value, index) {
        this.checkIndex(index, "insert")
        // Traverse to target index
        let currentNode = this.head
        for (let i=0; i<index; i++) {
            currentNode = currentNode.next
        }
        // Insert value to target index
        let newNode = new Node(value, currentNode.next)
        currentNode.next = newNode
        this.length++
        this.show()
    }

    remove(target) {
        console.log(target)
        let value = target["value"]
        let index = target["index"]
        if (typeof value == "undefined" && index != "") {
            index = parseInt(index)
            this.checkIndex(index, "remove")
            let currentNode = this.head
            for (let i=0; i<index; i++) {
                currentNode = currentNode.next
            }
            console.log(currentNode.value)
            currentNode.next = currentNode.next.next
            this.length -= 1
        } else if (typeof index == "undefined" && value != "") {
            let found = false
            let prevNode = null
            let currentNode = this.head
            while(currentNode != null) {
                if (currentNode.value == value) {
                    found = true
                    break
                }
                prevNode = currentNode
                currentNode = currentNode.next
            }
            if (found){
                console.log(prevNode.value)
                prevNode.next = currentNode.next
                this.length -= 1
            }
            else {throw "Value not found."}
        }
        this.show()
    }

    sort(direction) {
        let sort = () => {
            let currX = this.head
            let currY = this.head
            for (let i=0; i<this.length-1; i++) {
                console.log(i)
                currX = currX.next
                currY = currX.next
                for (let j=i+1; j<this.length; j++) {
                    console.log(i, j)
                    // Compare
                    if (currY.value < currX.value) {
                        let temp = currY.value
                        currY.value = currX.value
                        currX.value = temp
                    }
                    // Move j
                    currY = currY.next
                }
            }
        }
        let reverse = head => {
            if (this.length <= 1) {
                return
            }
            let currNode = head
            let prevNode = null
            let nextNode = currNode.next
            while (nextNode != null) {
                // Current goes to Next
                currNode = nextNode
                // Next goes to Current.next
                nextNode = currNode.next
                // Current.next goes to Previous
                currNode.next = prevNode
                // Previous goes to Current
                prevNode = currNode
            }
            this.head.next = prevNode
        }
        // Check which direction the sorting must be done
        switch (direction) {
            case "ascending":
                sort()
                break
            case "descending":
                sort()
                reverse(this.head)
                break
            case "reverse":
                reverse(this.head)
                break
        }
        this.show()
    }

    makeUnique() {
        let currNode = this.head
        let prevNode = this.head
        let existingElements = []
        while (currNode.next != null) {
            currNode = currNode.next
            if (!existingElements.includes(currNode.value)) {
                existingElements.push(currNode.value)
            } else {
                prevNode.next = currNode.next
                this.length -= 1
                continue
            }
            prevNode = currNode
        }
        this.show()
    }
}