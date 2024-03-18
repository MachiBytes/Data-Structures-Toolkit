export default class CustomArray {
    constructor() {
        this.elements = ["1", "2", "3", "4", "5"]
    }

    checkIndex(index, mode) {
        let limit = this.elements.length
        if (mode == "remove") {limit -= 1}
        if (index > limit) {
            throw `Index out of range. Please input an index from 0 to ${limit} only.`
        }
    }

    show() {
        console.log(this.elements)
    }

    clear() {
        this.elements = []
    }

    insert(value, index) {
        this.checkIndex(index, "insert")
        let oldValue = value
        while (index < this.elements.length) {
            oldValue = this.elements[index]
            this.elements[index] = value
            value = oldValue
            index++
        }
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
            this.checkIndex(index, "remove")
            this.elements.splice(index, 1)
        } else if (typeof index == "undefined" && value != "") {
            let targetIndex = this.elements.indexOf(value)
            let n = this.elements.length
            if (targetIndex === -1) {
                throw "Value does not exist in array."
            }
            if (targetIndex == n) {
                this.elements.pop()
                return
            }
            for (let i=targetIndex+1; i<n; i++) {
                this.elements[i-1] = this.elements[i]
            }
            this.elements.pop()
        }
        this.show()
    }

    sort(direction) {
        let quickSort = (arr, low, high) => {
            let partition = (arr, low, high) => {
                let pivot = arr[high]

                let i = low-1

                for (let j=low; j<= high-1; j++) {
                    if (arr[j]<pivot) {
                        i++
                        [arr[i], arr[j]] = [arr[j], arr[i]]
                    }
                }

                [arr[i+1], arr[high]] = [arr[high], arr[i+1]]
                return i+1
            }

            if (low<high) {
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