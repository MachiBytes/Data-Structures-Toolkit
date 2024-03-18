class Node {
    constructor(value, next=null) {
        this.value = value
        this.next = next
    }
}

export default class CustomLinkedList {
    constructor() {
        this.head = new Node("head")
        this.length = 5
        this.head.next = new Node("1", new Node("2", new Node("3", new Node("4", new Node("5")))))
    }

    checkIndex(index, mode) {
        let limit = this.length
        if (mode == "remove") {limit -= 1}
        if (index > limit) {
            throw `Index out of range. Please input an index from 0 to ${limit} only.`
        }
    }

    show() {
        let output = ""
        let current = this.head.next
        while (current != null) {
            output += `${current.value} `
            current = current.next
        }
        console.log(output)
    }

    clear() {
        this.head = new Node(null)
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
                currX = currX.next
                currY = currX.next
                for (let j=i+1; j<this.length; j++) {
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
                continue
            }
            prevNode = currNode
        }
        this.show()
    }
}