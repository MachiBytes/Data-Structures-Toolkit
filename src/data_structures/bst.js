class Node {
    constructor (value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
};

export default class BST {
    constructor(arr=[]){
        this.root = null
        // this.insertArray([1, 3, 6, 7, -3, 13, 9, -2, 4, 8, 1, -4, -8])
        if (arr.length > 0) {
            this.insertArray(arr)
        }
    }

    push(value){
        var newNode = new Node(value);
        if (this.root == null)
            this.root = newNode;
        else {
            this.insertNode(this.root, newNode);
        }
        this.show()
    }

    insertNode(node, newNode){
        if (newNode.value < node.value)
        {    
            if (node.left == null)
                node.left = newNode;    
            else
            {
                node = node.left;
                this.insertNode(node, newNode);
            }

        }    
        else if (newNode.value > node.value)
        {
            if (node.right == null)
                node.right = newNode;
            else
            {
                node = node.right;
                this.insertNode(node, newNode);
            }
        }
    }

    insertArray(arr) {
        for (let i = 0; i < arr.length; i++)
            this.push(arr[i]);
    
    }

    show() {
        let traverseDepth = (node=this.root, height=0, levels={}) => {
            // DepthFirst
            if (node) {
                try {
                    levels[height].push(node.value)
                } catch (err) {
                    levels[height] = [node.value]
                }
                traverseDepth(node.left, height+1, levels)
                traverseDepth(node.right, height+1, levels)
                return levels
            }
        }
        let levels = traverseDepth()
        console.log(levels)
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
                root.left = removeNode(root.left, value)
            } else if (value > root.value) {
                // Operate on the left side
                root.right = removeNode(root.right, value)
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
                root.value = min(root.right)
                root.right = removeNode(root.right, root.value)
            }
            return root
        }
        this.root = removeNode(this.root, value)
        this.show()
    }
}