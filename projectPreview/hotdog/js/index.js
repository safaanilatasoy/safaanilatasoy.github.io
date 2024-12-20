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

addCloseButtonListeners();



function setActiveTab(windowId, displayCondition) {
  const allWindows = document.querySelectorAll('[id^="popup-window"]');
  allWindows.forEach(win => win.style.display = 'none'); // Tüm pencereleri gizle
  const windowToShow = document.getElementById(windowId);
  if (windowToShow) {
    windowToShow.style.display = displayCondition; // İlgili pencereyi göster
  } else {
    console.error(`${windowId} penceresi bulunamadı.`);
  }
}

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


let clickCount = 0;
let clickTimer;
// Klasör açma fonksiyonu
function openFolder(folderId, displayCondition) {
  clickCount++;
  if(clickCount === 1){
    clickTimer = setTimeout(() => {
      // Tek tıklama işlemi (eğer gerekiyorsa)
      console.log("Tek tıklama");
      clickCount = 0; // Tıklama sayacını sıfırla
  }, 300); // 300ms bekleme süresi
  } else if (clickCount === 2){
    // Çift tıklama olduğunda
    clearTimeout(clickTimer); // Zamanlayıcıyı temizle
    clickCount = 0; // Tıklama sayacını sıfırla

    // Çift tıklama işlemi
    if (temp == 1) {  // Bir kez sürükleme yapılmışsa
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
      case "notepad-window":
        newTab.textContent = "Notepad";
        break;
      case "credit-window":
        newTab.textContent = "Credit";
        break;
      case "themes-file":
        newTab.textContent = "Themes";
        break;
      default:
        newTab.textContent = "Tab";
    }
    newTab.setAttribute('data-window-id', folderId);
    newTab.addEventListener('click', () => setActiveTab(folderId, displayCondition));
    taskbarTabs.appendChild(newTab);

    // Yeni pencereyi aktif yap
    setActiveTab(folderId, displayCondition);
  }
 
   
    
    newTab.setAttribute('data-window-id', folderId);
    newTab.addEventListener('click', () => setActiveTab(folderId,displayCondition));
    taskbarTabs.appendChild(newTab);

    // Yeni pencereyi aktif yap
    setActiveTab(folderId,displayCondition);
  }
}

function closeWindow(folderId) {
  const window = document.getElementById(folderId);
  if (window) window.style.display = "none";

  const tabToRemove = document.querySelector(`.taskbar-tab[data-window-id="${folderId}"]`);
  if (tabToRemove) tabToRemove.remove();
}

// Kapama düğmelerine tıklama olayları ekleme
function addCloseButtonListeners() {
  const closeButtons = document.querySelectorAll(".close-button"); // Kapama butonlarını seç
  closeButtons.forEach(button => {
    button.addEventListener("click", handleCloseEvent);
    button.addEventListener("touchend", handleCloseEvent, { passive: false });
  });
}

// Kapama işlemini çağıran yardımcı fonksiyon
function handleCloseEvent(event) {
  event.preventDefault();
  const folderId = this.getAttribute("data-folder-id"); // Kapama butonunda pencere ID'si olmalı
  if (folderId) closeWindow(folderId);
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

function restartPage() {
  location.reload(); // Sayfayı yeniler
}



function openWindow(windowId,displayCondition) {
  const targetWindow = document.getElementById(windowId);
  if (targetWindow) {
    targetWindow.style.display = displayCondition; // Pencereyi görünür yap
    targetWindow.style.zIndex = '9999';  // Önde olmasını sağla
  } else {
    console.error(`${windowId} penceresi bulunamadı.`);
  }
}

// Tema Changing

let snowing = false;
let themeChanged = false;

document.getElementById('make-snow').addEventListener('click', function() {
    if (!themeChanged) {
        document.body.classList.add('snow-theme');
        themeChanged = true;
    }
    if (!snowing) {
        startSnow();
        snowing = true;
    } 
});

document.getElementById('reset-theme').addEventListener('click', function() {
    document.body.classList.remove('snow-theme');
    stopSnow();
    snowing = false;
    themeChanged = false;
});

function startSnow() {
    for (let i = 0; i < 100; i++) {
        let snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * window.innerWidth + 'px';
        snowflake.style.width = snowflake.style.height = Math.random() * 5 + 2 + 'px';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(snowflake);
    }
}

function stopSnow() {
    let snowflakes = document.getElementsByClassName('snowflake');
    while (snowflakes.length > 0) {
        snowflakes[0].parentNode.removeChild(snowflakes[0]);
    }
}

