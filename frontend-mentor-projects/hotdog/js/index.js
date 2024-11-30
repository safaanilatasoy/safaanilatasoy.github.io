var draggableImages = document.querySelectorAll(".draggableImage");
var dragable = document.querySelectorAll(".dragable");

var offsetX, offsetY, isDragging = false;
let temp = 0;

window.onload = function() {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
}, 1000000); 
};
function onMouseDown(event) {
  event.preventDefault();
  var rect = this.getBoundingClientRect();
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;
  isDragging = true;
  temp= 0; // Her drag olayında artırın
}

function onMouseMove(event) {
  if (isDragging) {
    event.preventDefault();
    this.style.left = event.clientX - offsetX + "px";
    this.style.top = event.clientY - offsetY + "px";
    temp +=1;
  }
}

function onMouseUp() {
  isDragging = false;
  temp +=1;
}

draggableImages.forEach(function (image) {
  image.addEventListener("mousedown", onMouseDown);
  image.addEventListener("mousemove", onMouseMove);
  image.addEventListener("mouseup", onMouseUp);
});

dragable.forEach(function (image) {
  image.addEventListener("mousedown", onMouseDown);
  image.addEventListener("mousemove", onMouseMove);
  image.addEventListener("mouseup", onMouseUp);
});

// Klasör açma fonksiyonu
function openFolder(folderId, displayCondition) {
  if (temp  == 1) {  // Bir kez sürükleme yapılmışsa
    var folders = document.getElementsByClassName("folder");
    for (var i = 0; i < folders.length; i++) {
      folders[i].style.display = "none"; // Tüm klasörleri gizleyin
    }

    var folder = document.getElementById(folderId);
    folder.style.display = displayCondition; // Tıklanan klasörü gösterin
  }
}

function closeWindow(windowID) {
  var window = document.getElementById(windowID);
  window.style.display = "none";
}
