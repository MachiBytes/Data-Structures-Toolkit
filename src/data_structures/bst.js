const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const fontFamily = "Short Stack"

class Cell {
    constructor(x, y, value, height, hasLeft, hasRight) {
        this.x = x
        this.y = y
        this.value = value
        this.height = height
        this.hasLeft = hasLeft
        this.hasRight = hasRight
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
        ctx.stroke()
    }
    draw() {
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = `36px ${fontFamily}`
        ctx.fillText(this.value, this.x, this.y)

        ctx.beginPath()
        ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI)
        ctx.stroke()

        if (this.hasLeft) {
            let tox = this.x - (50 * 2 ** this.height)
            let toy = this.y + 100
            this.canvas_arrow(this.x-50, this.y, tox, toy)
        }
        if (this.hasRight) {
            let tox = this.x + (50 * 2 ** this.height)
            let toy = this.y + 100
            this.canvas_arrow(this.x+50, this.y, tox, toy)
        }
    }
} 


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
        this.components = []
        // this.insertArray([1, 3, 6, 7, -3, 13, 9, -2, 4, 8, 1, -4, -8])
        if (arr.length > 0) {
            this.insertArray(arr)
            this.populate()
        }
    }

    clear() {
        this.root = null
        this.components = []
    }

    show() {
        this.populate()
    }

    populate() {
        let drawTree = (node, x, y) => {
            let height = this.getHeight(node)
            // Draw circle
            this.components.push(new Cell(
                x,
                y,
                node.value,
                height,
                node.left != null,
                node.right != null
            ))
            if (node.left != null) {
                drawTree(node.left, x-(50*2**height), y+150)
            }
            if (node.right != null) {
                drawTree(node.right, x+(50*2**height), y+150)
            }
        }

        let baseX = 900
        let baseY = 200
        if (this.components.length != 0) {
            baseX = this.components[0].x
            baseY = this.components[0].y
        }
        this.components = []
        // Draw tree
        drawTree(this.root, baseX, baseY)
    }

    getHeight(node, height=0) {
        if (node == null) {
            return height; // If node is null, return the current height
        } else {
            // Recursively calculate the height of the left and right subtrees
            let left_height = this.getHeight(node.left, height + 1);
            let right_height = this.getHeight(node.right, height + 1);
    
            // Return the maximum height of left or right subtree
            return Math.max(left_height, right_height);
        }
    }
    

    push(value){
        var newNode = new Node(parseInt(value));
        if (this.root == null)
            this.root = newNode;
        else {
            this.insertNode(this.root, newNode);
        }
        this.populate()
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
        this.populate()
    }
}