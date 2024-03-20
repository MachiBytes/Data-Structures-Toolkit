import CustomArray from "./data_structures/arrays.js"
import CustomLinkedList from "./data_structures/linked_lists.js"
import CustomStack from "./data_structures/stacks.js"
import CustomQueue from "./data_structures/queues.js"
import CustomBST from "./data_structures/bst.js"

const dropdowns = document.querySelectorAll("div.dropdown")
export const objects = {
    "arrays": new CustomArray(),
    "linkedlists": new CustomLinkedList(),
    "stacks": new CustomStack(),
    "queues": new CustomQueue(),
    "bst": new CustomBST()
}

// FUNCTIONS
// Actions Bar
let showDiv = divId => {
    let targetDiv = document.getElementById(divId)
    if (targetDiv.style.display === "block") {
        targetDiv.style.display="none"
        return
    }

    for (let i=0; i<dropdowns.length; i++) {
        dropdowns[i].style.display="none"
    }
    targetDiv.style.display="block"
}

let getCurrentPage = () => {
    let pathName = window.location.pathname
    let currentPage = pathName.replace("/pages/", "").replace(".html", "")
    return currentPage
}

let create = () => {
    let currentPage = getCurrentPage()
    let target = objects[currentPage]
    let size = document.getElementById("create-value").value
    target.clear(size)
}

let clear = () => {
    let currentPage = getCurrentPage()
    let target = objects[currentPage]
    target.clear()
    target.show()
}

let insert = () => {
    let currentPage = getCurrentPage()
    let target = objects[currentPage]
    let value = document.getElementById("insert-value").value
    let index = parseInt(document.getElementById("insert-index").value)
    try {
        target.insert(value, index)
    } catch (err) {console.log(err)}
}

let remove = () => {
    let currentPage = getCurrentPage()
    let targetObject = objects[currentPage]
    let targetElement = {
        [document.getElementById("remove-select").value]: document.getElementById("remove-input").value
    }
    try {
        targetObject.remove(targetElement)
    } catch (err) {console.log(err)}
}

let bremove = () => {
    let currentPage = getCurrentPage()
    let targetObject = objects[currentPage]
    let value = document.getElementById("remove-input").value
    targetObject.remove(value)
}

let sort = () => {
    let currentPage = getCurrentPage()
    let target = objects[currentPage]
    let direction = document.getElementById("sort-select").value
    target.sort(direction)
}
let pop = () => {
    let currentPage = getCurrentPage()
    let target = objects[currentPage]
    target.pop()
}
let push = () => {
    let currentPage = getCurrentPage()
    let target = objects[currentPage]
    let value = document.getElementById("push-value").value
    target.push(value)
}

// Dropdowns
try {
    let createButton = document.getElementById("create-button")
    createButton.addEventListener("click", () => {showDiv("create-dropdown")})
} catch(err) {}
try {
    let insertButton = document.getElementById("insert-button")
    insertButton.addEventListener("click", () => {showDiv("insert-dropdown")})
} catch (err) {}
try {
    let removeButton = document.getElementById("remove-button")
    removeButton.addEventListener("click", () => {showDiv("remove-dropdown")})
} catch (err) {}
try {
    let sortButton = document.getElementById("sort-button")
    sortButton.addEventListener("click", () => {showDiv("sort-dropdown")})
} catch (err) {}
try {
    let editButton = document.getElementById("edit-button")
    editButton.addEventListener("click", () => {showDiv("edit-dropdown")})
} catch (err) {}
try {
    let pushButton = document.getElementById("push-button")
    pushButton.addEventListener("click", () => {showDiv("push-dropdown")})
} catch (err) {}

// Function Buttons
try {
    let clearButton = document.getElementById("clear-button")
    clearButton.addEventListener("click", () => {clear()})
} catch(err) {}
try {
    let makeUniqueButton = document.getElementById("make-unique")
    makeUniqueButton.addEventListener("click", () => {objects["linkedlists"].makeUnique()})
} catch (err) {}
try {
    let popButton = document.getElementById("pop-button")
    popButton.addEventListener("click", () => {pop()})
} catch (err) {}

// Submit Buttons for Dropdowns
try {
    let createSubmit = document.getElementById("create-submit")
    createSubmit.addEventListener("click", () => create())
} catch (err) {}
try {
    let insertSubmit = document.getElementById("insert-submit")
    insertSubmit.addEventListener("click", () => insert())
} catch (err) {}
try {
    let removeSubmit = document.getElementById("remove-submit")
    removeSubmit.addEventListener("click", () => {remove()})
} catch (err) {}
try {
    let bremoveSubmit = document.getElementById("b-remove-submit")
    bremoveSubmit.addEventListener("click", () => {bremove()})
} catch (err) {}
try {
    let sortSubmit = document.getElementById("sort-submit")
    sortSubmit.addEventListener("click", () => {sort()})
} catch (err) {}
try {
    let pushSubmit = document.getElementById("push-submit")
    pushSubmit.addEventListener("click", () => {push()})
} catch (err) {}