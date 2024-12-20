const draggableElements = document.querySelectorAll(".draggableImage");



var offsetX, offsetY, isDragging = false;
let temp = 0;
let windowCount = 0;
const taskbarTabs = document.getElementById('taskbarTabs');

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

window.onload = function() {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
}, 1000000); 
};

function onMouseDown(event) {
  e = e || window.event;
  e.preventDefault();
  // Get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDragElement;
  // Call a function whenever the cursor moves:
  document.onmousemove = elementDrag;
  isDragging = true;
  temp= 0; // Her drag olayında artırın
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
    folder.style.zIndex = "9999";


    // Taskbar'a yeni sekme ekleyin
    const newTab = document.createElement('button');
    newTab.classList.add('taskbar-tab');

    switch(folderId) {
      case "myComputer":
        newTab.textContent = "Token";
        break;
      case "x-con":
        newTab.textContent = "Follow on X";
        break;
      case "music-player":
        newTab.textContent = "WinPump";
        break;
      case "iex":
        newTab.textContent = "Loading...";
        break;
      case "fake-cmd":
        newTab.textContent = "DogMD Console";
        break;
      case "dont-click":
        newTab.textContent = "Don't Click";
        break;
      case "dont-click2":
        newTab.textContent = "I SAID DON'T CLICK";
        break;
      case "dont-click3":
        newTab.textContent = "BRO.. Last Change";
        break;
      case "whitepaper-window":
        newTab.textContent = "Whitepaper";
        break;
      case "calculator-window":
        newTab.textContent = "Calculator";
        break;
      case "crypto-prices":
        newTab.textContent = "Market";
        break;
      case "themes-file":
        newTab.textContent = "Themes";
        break;
      default:
        newTab.textContent = "Tab";
    }
    newTab.setAttribute('data-window-id', folderId);
    newTab.addEventListener('click', () => setActiveTab(folderId,displayCondition));
    taskbarTabs.appendChild(newTab);

    // Yeni pencereyi aktif yap
    setActiveTab(folderId,displayCondition);
  }
}

function closeWindow(folderId) {
  var window = document.getElementById(folderId);
  window.style.display = "none";

  const tabToRemove = document.querySelector(`.taskbar-tab[data-window-id="${folderId}"]`);
      if (tabToRemove) tabToRemove.remove();
}



    function setActiveTab(windowId,displayCondition) {
      // Tüm sekmeleri pasif yap
      const allTabs = document.querySelectorAll('.taskbar-tab');
      allTabs.forEach(tab => tab.classList.remove('active'));

      // Aktif olan sekmeyi belirle
      const activeTab = document.querySelector(`.taskbar-tab[data-window-id="${windowId}"]`);
      if (activeTab) activeTab.classList.add('active');

      // Aktif pencereyi göster
      const allWindows = document.querySelectorAll('.bin-general-component');
      allWindows.forEach(window => window.style.zIndex = 1);
      const activeWindow = document.getElementById(windowId);
      if (activeWindow){
        activeWindow.style.display = displayCondition;
        activeWindow.style.zIndex = "9999";
      } 
   
    }
    

    function toggleStartMenu() {
      const startMenu = document.getElementById('startMenu');
      if (startMenu.style.display === 'block') {
        startMenu.style.display = 'none'; // Menü kapat
      } else {
        startMenu.style.display = 'block'; // Menü aç
      }
    }
    
    // Menü dışında bir yere tıklayınca menüyü kapat
    window.addEventListener('click', function (event) {
      const startMenu = document.getElementById('startMenu');
      const startButton = document.querySelector('.startButton');
      if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.style.display = 'none';
      }
    });
    

    function triggerErrorScreen() {
      let windowComponent = document.getElementById('dont-click3');
      windowComponent.style.display = 'none';
      const errorScreen = document.getElementById('errorScreen');
      errorScreen.style.display = 'block';
      
      setTimeout(() => {
        window.location.reload(); // Siteyi yeniden başlatır
      }, 6000); // 5 saniye bekler
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
