// Make all elements with the "drag" class draggable
const draggableElements = document.querySelectorAll(".draggableImage");

draggableElements.forEach((elmnt) => {
  dragElement(elmnt);
});

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  if (elmnt.querySelector(".header")) {
    // If there's a header, move the DIV from the header:
    elmnt.querySelector(".header").onmousedown = dragMouseDown;
  } else {
    // Otherwise, move the DIV from anywhere inside the element:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // Get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // Call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // Stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
