export default class CustomArray {
    constructor(length) {
        this.length = length
        this.elements = []
        this.populate()
    }

    populate() {
        for (let i=0; i<this.length; i++) {
            this.elements[i] = undefined
        }
    }

    checkIndex(index) {
        let limit = this.length-1
        if (index > limit) {
            throw `Index out of range. Please input an index from 0 to ${limit} only.`
        }
    }

    show() {
        console.log(this.length, this.elements)
    }

    clear(length) {
        this.length = length
        this.elements = []
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