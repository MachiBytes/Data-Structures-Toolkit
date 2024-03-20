// /*
// This is where we compute the locations of each component
// */

import { objects } from "./general.js"

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables for panning
let isPanning = false;
let lastMouseX, lastMouseY;

// Event listener for mouse down
canvas.addEventListener('mousedown', handleMouseDown);

// Event listener for mouse move
canvas.addEventListener('mousemove', handleMouseMove);

// Event listener for mouse up
canvas.addEventListener('mouseup', handleMouseUp);

// Function to handle mouse down event
function handleMouseDown(event) {
    if (event.button === 0) {
        isPanning = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
}

// Get the current page
let getCurrentPage = () => {
    let pathName = window.location.pathname
    let currentPage = pathName.replace("/pages/", "").replace(".html", "")
    return currentPage
}

// Function to handle mouse move event while panning
function handleMouseMove(event) {
    if (isPanning) {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        // Update positions of all cells
        let currentPage = getCurrentPage()
        let targetObject = objects[currentPage]
        targetObject.components.forEach(cell => {
            cell.x += deltaX;
            cell.y += deltaY;
        });
    }
}

// Function to handle mouse up event
function handleMouseUp() {
    isPanning = false;
}

let animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    ctx.beginPath(); // Clear the previous path and start a new one
    let currentPage = getCurrentPage();
    let targetObject = objects[currentPage];
    
    // Draw each component
    targetObject.components.forEach(cell => {
        cell.draw()
    })
};

animate();

