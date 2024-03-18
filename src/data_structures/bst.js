class Node {
    constructor(value, left=null, right=null) {
        this.value = value
        this.left = left
        this.right = right
    }
}

export default class BST { 
    constructor() {
        this.root = null
    }

    show() {
        let output = ""
        if (!this.root) {
            console.log("Empty!")
            return
        }

        let queue = [this.root]
        let currNode = this.root
        while (queue.length > 0) {
            currNode = queue.shift()
            if (currNode.left != null) {queue.push(currNode.left)}
            if (currNode.right != null) {queue.push(currNode.right)}
            output += currNode.value + " "
        }
        console.log(output)
    }

    add(value) {
        let insertNode = (root, newNode) => {
            let currNode = root
            while (currNode != null) {
                if (newNode.data < currNode.data) {
                    // Operate on the left side
                    if (currNode.left == null) {
                        currNode.left = newNode
                    } else {
                        insertNode(currNode.left, newNode)
                    }
                } else {
                    // Operate on the right side
                    if (currNode.right == null) {
                        currNode.right = newNode
                    } else {
                        insertNode(currNode.right, newNode)
                    }
                }
            }
        }
        const newNode = new Node(value)

        // Check if tree is empty
        if (this.root == null) {
            this.root = newNode
            return
        }

        // If tree is not empty
        insertNode(this.root, newNode)
    }

    remove(value) {
        let min = root => {
            if (!root.left) {
                return root.value
            } else {
                return min(root.left)
            }
        }

        let removeNode = (root, value) => {
            if (!root) {
                return root
            }
            if (value < root.value) {
                // Operate on the left side
                root.left = deleteNode(root.left, value)
            } else if (value > root.value) {
                // Operate on the left side
                root.right = deleteNode(root.right, value)
            } else {
                // We found the node
                if (!root.left && !root.right) {
                    return null
                }
                if (!root.left) {
                    return root.right
                } else if (!root.right) {
                    return root.left
                }
                root.value = this.min(root.right)
                root.right = this.deleteNode(root.right, root.value)
            }
            return root
        }
        this.root = removeNode(this.root, value)
    }
}