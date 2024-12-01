var draggableImages = document.querySelectorAll(".draggableImage");
var dragable = document.querySelectorAll(".dragable");

var offsetX, offsetY, isDragging = false;
let temp = 0;
let windowCount = 0;
const taskbarTabs = document.getElementById('taskbarTabs');


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
        newTab.textContent = "Calculaitor";
        break;
      default:
        newTab.textContent = "Unknown";
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
        activeWindow.style.zIndex = 999999999;
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
    