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
    }
    draw() {
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = `18px ${fontFamily}`
        ctx.fillText(this.index, this.x + 50, this.y - 20)
        ctx.font = `36px ${fontFamily}`
        ctx.fillText(this.value, this.x + 50, this.y + 50)
        ctx.rect(this.x, this.y, 100, 100);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}


export default class CustomArray {
    constructor(length) {
        this.length = 1
        this.elements = []
        this.components = []
        this.populate()
    }

    populate() {
        let baseX = 400
        let baseY = 300
        for (let i=0; i<this.length; i++) {
            this.elements[i] = undefined
            this.components[i] = new Cell(
                i,
                "",
                baseX + (110 * i),
                baseY
            )
        }
    }

    checkIndex(index) {
        let limit = this.length-1
        if (index > limit) {
            throw `Index out of range. Please input an index from 0 to ${limit} only.`
        }
    }

    show() {
        for (let i=0; i<this.length; i++) {
            let value = this.elements[i]==undefined ? "" : this.elements[i]
            this.components[i].value = value
        }
    }

    clear(length) {
        this.length = length
        this.elements = []
        this.components = []
        this.populate()
        this.show()
    }

    insert(value, index) {
        this.checkIndex(index)
        this.elements[index] = value
        this.show()
    }

    remove(target) {
        // Check if given key is index or value then implement the appropriate logic
        let value = target["value"]
        let index = target["index"]
        console.log(target)
        if (typeof value == "undefined" && index != "") {
            index = parseInt(index)
            this.checkIndex(index)
            this.elements[index] = undefined
        } else if (typeof index == "undefined" && value != "") {
            let targetIndex = this.elements.indexOf(value)
            this.elements[targetIndex] = undefined
        }
        this.show()
    }

    sort(direction) {
        let quickSort = (arr, low, high) => {
            let partition = (arr, low, high) => {
                let pivot = arr[high]

                let i = low-1

                for (let j=low; j<= high-1; j++) {
                    if (arr[j]<pivot || pivot==undefined) {
                        i++
                        [arr[i], arr[j]] = [arr[j], arr[i]]
                    }
                }

                [arr[i+1], arr[high]] = [arr[high], arr[i+1]]
                return i+1
            }

            if (low<high || high==undefined) {
                let partitioning_index = partition(arr, low, high)
                quickSort(arr, low, partitioning_index - 1)
                quickSort(arr, partitioning_index + 1, high)
            }
        }
        let reverse = arr => {
            let n = arr.length
            let half = n / 2
            for (let i=0; i<half; i++) {
                [arr[i], arr[n - 1 - i]] = [arr[n-1-i], arr[i]]
            }
        }
        // Check which direction the sorting must be done
        switch (direction) {
            case "ascending":
                quickSort(this.elements, 0, this.elements.length - 1)
                break
            case "descending":
                quickSort(this.elements, 0, this.elements.length - 1)
                reverse(this.elements)
                break
            case "reverse":
                reverse(this.elements)
                break
        }
        this.show()
    }
}