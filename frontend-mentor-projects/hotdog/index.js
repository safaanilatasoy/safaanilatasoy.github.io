var draggableImages = document.querySelectorAll(".draggableImage");
var offsetX,
  offsetY,
  isDragging = false;

draggableImages.forEach(function (image) {
  image.addEventListener("mousedown", function (event) {
    event.preventDefault();
    var rect = this.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    isDragging = true;
  });

  image.addEventListener("mousemove", function (event) {
    if (isDragging) {
      event.preventDefault();
      this.style.left = event.clientX - offsetX + "px";
      this.style.top = event.clientY - offsetY + "px";
    }
  });

  image.addEventListener("mouseup", function () {
    isDragging = false;
  });
});


// Klasör açma fonnksiyonu
function openFolder(folderId) {
    var folders = document.getElementsByClassName("folder");
    for (var i = 0; i < folders.length; i++) {
        folders[i].style.display = "none"; // Tüm klasörleri gizleyin
    }

    var folder = document.getElementById(folderId);
    folder.style.display = "block"; // Tıklanan klasörü gösterin
}


function closeWindow(windowID) {
    var window = document.getElementById(`${windowID}`);
    window.style.display = "none";
}



var dragable = document.querySelectorAll(".dragable");
var offsetX,
  offsetY,
  isDragging = false;

dragable.forEach(function (image) {
  image.addEventListener("mousedown", function (event) {
    event.preventDefault();
    var rect = this.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    isDragging = true;
  });

  image.addEventListener("mousemove", function (event) {
    if (isDragging) {
      event.preventDefault();
      this.style.left = event.clientX - offsetX + "px";
      this.style.top = event.clientY - offsetY + "px";
    }
  });

  image.addEventListener("mouseup", function () {
    isDragging = false;
  });
});

