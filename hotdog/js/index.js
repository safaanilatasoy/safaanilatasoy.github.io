var draggableImages = document.querySelectorAll(".draggableImage");

var dragable = document.querySelectorAll(".dragable");

var offsetX, offsetY, isDragging = false;
let temp = 0;
let windowCount = 0;
const taskbarTabs = document.getElementById('taskbarTabs');
const discoverContent = `
 <div class="awg-discover-container">
  <div class="awg-discover-header">
    <h1>Introducing the Abstract Global Wallet</h1>
    <p>
      Sign in with your socials, fund your wallet in seconds, and seamlessly use apps—all without having to install an extension.<br>
      The Abstract Global Wallet is everything you need all in one place, creating one cohesive user experience.
    </p>
  </div>

  <div class="awg-discover-image-section">
   
    <img src="./images/abs-discover-1.jpeg" alt="Abstract Global Wallet" class="awg-discover-image">
  </div>

  <div class="awg-discover-why-section">
    <h2>Why?</h2>
    <p>
      The current crypto experience is fragmented. Separate browser extensions, non-transparent signatures, and a reliance on seed phrases create confusion and significant security risks for user assets.<br>
      This needs to be fixed in order to onboard the next wave of crypto users.
    </p>
  </div>

  <div class="awg-discover-image-section">
   
    <img src="./images/abs-discover-2.jpeg" alt="Crypto Experience Fragmented" class="awg-discover-image">
  </div>

  <div class="awg-discover-why-section">
    <h2>What?</h2>
    <p>
      The Abstract Global Wallet (AGW)—an easily integrable, cohesive, and secure wallet system.
      <br>
      Create a wallet via email, socials, or passkeys. Fund it in seconds, and use it across apps with one-click logins.<br>
      No seed phrases, no extensions—just seamless onchain interaction.
    </p>
  </div>

    <div class="awg-discover-image-section">
   
    <img src="./images/abs-discover-3.jpeg" alt="Crypto Experience Fragmented" class="awg-discover-image">
  </div>

  <div class="awg-discover-why-section">
    <h2>How?</h2>
    <p>
      At a high level, each AGW is comprised of two components—an embedded wallet signer powered by 
<a href='https://x.com/privy_io' target='__blank'>@privy_io</a>
 and a smart contract wallet.

      <br>
      The embedded wallet will be an authorized signer of the smart contract wallet, initiating transactions on its behalf.
    </p>

    
  </div>
 <div class="awg-discover-image-section">
   
    <img src="./images/abs-discover-4.jpeg" alt="Crypto Experience Fragmented" class="awg-discover-image">
  </div>

  <div class="awg-discover-why-section">
    <p>
      AGW leverages Abstract's native account abstraction protocol to execute transactions. Gas sponsorship will be available out of the box.
      <br>
      An SDK will be provided to developers to easily integrate AGW one-click login into their apps.
    </p>
  </div>

   <div class="awg-discover-image-section">
   
    <img src="./images/abs-discover-5.jpeg" alt="Crypto Experience Fragmented" class="awg-discover-image">
  </div>


  <div class="awg-discover-why-section">
    <h2>Vision</h2>
    <p>
      The vision for the Abstract Global Wallet is simple: reduce adoption bottlenecks in crypto and deliver a safe, user-friendly, and unified experience for onchain participants.
      <br>
      AGW will launch alongside our mainnet later this year. Stay tuned for updates.
    </p>
  </div>

  
   <div class="awg-discover-image-section">
   
    <img src="./images/abs-discover-6.jpeg" alt="Crypto Experience Fragmented" class="awg-discover-image">
  </div>


</div>
`;

const developContent = `
 <div class="awg-discover-container">
    <img src="./images/EMH-26.gif" class="awg-discover-image">
  </div>

  
`;
const rewardsContent = `
 <div class="awg-discover-container">
   <h2>Coming Soon</h2>
  </div>

  
`;


const defaultContent = `
  <div class="abs-right-con-top">
          <div class="top-left-con">
            <img class="tlcon-img" src="./images/Abstract_Icon_DarkGreen.svg" alt="">
            <div class="wallet-adr">
              <span>0x213..3245</span>
              <div class="wallet-adr-copy-icon">
                <img src="./images/copyIcon.png" alt="">
              </div>
            </div>
          </div>

          <div class="bottom-left-con">
            <div class="bottom-left-money">
              <div class="money-eth">0.0278 <span>ETH</span></div>
              <div class="money-usd">$65.99</div>
            </div>
            <div class="money-stats">
              <div class="usdtats">$34.8</div>
              <div class="stats-time">Last 7 days</div>
            </div>
          </div>

          <div class="top-right-con">
            <div class="abs-tr-button" id="wallet-fund">
              <img src="./images/fundIcon.png" alt="">
              <span>Fund</span>
            </div>
            <div class="abs-tr-button">
              <img src="./images/receiveIcon.png" alt="">
              <span>Receive</span>
            </div>
            <div class="abs-tr-button">
              <img src="./images/sendIcon.png" alt="">
              <span>Send</span>
            </div>
          </div>
          <div class="bottom-right-con">
            <div class="abs-wrapper">
              <canvas id="abs-canvas"></canvas>
              
            </div>
          </div>
         </div>
         <div class="abs-right-con-bottom" id="abs-right-con-bottom">
          <div class="top-navbar">
            <div class="button-list">
              <div class="button active">Tokens</div>
              <div class="button">NFT</div>
              <div class="button">Apps</div>
              <div class="button">Transaction history</div>

            </div>
            <input type="search" class="search" placeholder="Search"></input>
          </div>
          <div class="list">
            <table>
              <thead>
                <tr class="abs-list-header">
                  <th scope="col">Assets</th>
                  <th scope="col">Price</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Value</th>
                  <th scope="col">Change</th>
                  <th scope="col">Change,%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Account"><img src="./images/usd-coin-usdc-logo.png" width="25"  alt=""><span>USDC</span></td>
                  <td data-label="Assets">$1.00</td>
                  <td data-label="Price">$22</td>
                  <td data-label="Balance">$22</td>
                  <td data-label="Change" style="color:green;">$0.23</td>
                  <td data-label="Change%" style="color:green;">0.15%</td>
                </tr>
                <tr>
                  <td scope="row" data-label="Account"><img src="./images/tether-usdt-logo.png" width="25"  alt=""><span>USDT</span></td>
                  <td data-label="Due Date">$1.00</td>
                  <td data-label="Amount">$240.81</td>
                  <td data-label="Period">$240.81</td>
                  <td data-label="Amount" style="color:green;">$0.24</td>
                  <td data-label="Amount" style="color:green;">0.13%</td>
                </tr>
                <tr>
                  <td scope="row" data-label="Account"><img src="./images/absLogo.png" width="25" alt="" style="border-radius: 50%;"><span>ABS</span></td>
                  <td data-label="Due Date">$?.??</td>
                  <td data-label="Amount">$1,181</td>
                  <td data-label="Period">$?,??</td>
                  <td data-label="Amount" style="color:green;">$1.25</td>
                  <td data-label="Amount" style="color:green;">?.??%</td>
                </tr>
                <tr>
                  <td scope="row" data-label="Acount"><img src="./images/HotDogsToken.png" width="25"  alt=""><span>HDG</span></td>
                  <td data-label="Due Date">$?.??</td>
                  <td data-label="Amount">$842</td>
                  <td data-label="Period">$???</td>
                  <td data-label="Amount" style="color:green;">$0.8</td>
                  <td data-label="Amount" style="color:green;">?.??%</td>
                </tr>
              </tbody>
            </table>
          </div>
`;

function updateContent(newContent, title) {
  const contentArea = document.getElementById('abs-content-area');
  contentArea.innerHTML = newContent;
  document.title = 'Hotdogs';
  history.pushState({ content: newContent, title: title }, title, `#${title.toLowerCase()}`);
}

function setActiveButton(activeId) {
  const buttons = document.querySelectorAll('.abs-left-navbar-list ul li');
  buttons.forEach(button => {
    if (button.id === activeId) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

document.getElementById('abs-logo-con').addEventListener('click', () => {
  updateContent(defaultContent);
  setActiveButton(null);
});


document.getElementById('discover-btn').addEventListener('click', () => {
  updateContent(discoverContent);
  setActiveButton('discover-btn');
});

document.getElementById('develop-btn').addEventListener('click', () => {
  updateContent(developContent);
  setActiveButton('develop-btn');
});
document.getElementById('rewards-btn').addEventListener('click', () => {
  updateContent(rewardsContent);
  setActiveButton('rewards-btn');
});




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


// Klasör açma fonksiyonu

function openFolder(iconElement, folderId, displayCondition) {
  // İkona özel tıklama sayacı ve zamanlayıcı
  if (!iconElement.clickCount) {
    iconElement.clickCount = 0;
  }

  iconElement.clickCount++;

  if (iconElement.clickCount === 1) {
    // İlk tıklama: ikon seçili hale gelir
    iconElement.classList.add('selected');

    // Zamanlayıcı başlatılır
    iconElement.clickTimer = setTimeout(() => {
      // İkinci tıklama gelmezse seçimi kaldır
      iconElement.classList.remove('selected');
      iconElement.clickCount = 0;
    }, 400); // Çift tıklama süresi (400ms ayarlanabilir)
  } else if (iconElement.clickCount === 2) {
    // İkinci tıklama: pencere açılır
    clearTimeout(iconElement.clickTimer);
    iconElement.clickCount = 0;
    iconElement.classList.remove('selected');

    // Pencere açma işlemleri
    var folder = document.getElementById(folderId);
    folder.style.display = displayCondition;
    folder.style.zIndex = "9999";

    // Eğer açılan pencere CMD ise, focusCommandLine'ı çağır
    if (folderId === "fake-cmd") {
      if (typeof window.focusCommandLine === 'function') {
        window.focusCommandLine();
      } else {
        console.error('focusCommandLine fonksiyonu tanımlı değil');
      }
    }

    // Taskbar'a yeni sekme eklenir
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
        newTab.textContent = "BRO.. Last Chance";
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
      case "honorary-file":
        newTab.textContent = "Honorary Hotdogs";
        break;
      case "crypto-prices":
        newTab.textContent = "Market Prices";
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
    
    // window.onload = function() {
    //   startSnow();
    //   if (!themeChanged) {
    //     document.body.classList.add('snow-theme');
    //     themeChanged = true;
    // }
    // if (!snowing) {
    //     startSnow();
    //     snowing = true;
    // } 
    // }

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
const snowBottom = document.getElementsByClassName('snowBottom');
const snowTop = document.getElementsByClassName('snowTop');
let snowing = false;
let themeChanged = false;

// Themes
document.getElementById('make-snow').addEventListener('click', function() {
    // Önce diğer temaları kaldır
    document.body.classList.remove('zombie-theme');
    document.body.classList.remove('heaven-theme');
    document.body.classList.remove('squid-game-theme');
    document.body.classList.remove('mcdonals-theme');

    stopBlood();
    stopRain();
    stopLightning();
    stopHeavenEffects();
    stopSquidGameEffects();

    document.body.classList.add('snow-theme');
    themeChanged = true;
    
    if (!snowing) {
        startSnow();
        snowing = true;
    } 
});



document.getElementById('make-zombie').addEventListener('click', function() {
  document.body.classList.remove('snow-theme');
  stopSnow();
  snowing = false;

  document.body.classList.remove('mcdonals-theme');
  document.body.classList.remove('heaven-theme');
  document.body.classList.remove('squid-game-theme');
  stopSquidGameEffects();
  stopHeavenEffects();
  document.body.classList.add('zombie-theme');
  startZombieEffects();
  themeChanged = true;
});


document.getElementById('make-heaven').addEventListener('click', function() {
  document.body.classList.remove('snow-theme');
  stopSnow();
  snowing = false;
  
  document.body.classList.remove('zombie-theme');
  stopBlood();
  stopRain();
  stopLightning();


  document.body.classList.remove('mcdonals-theme');
  document.body.classList.remove('squid-game-theme');
  stopSquidGameEffects();

  document.body.classList.add('heaven-theme');
  startHeavenEffects();
  themeChanged = true;
});

document.getElementById('make-squid').addEventListener('click', function() {
  document.body.classList.remove('snow-theme');
  stopSnow();
  snowing = false;
  
  document.body.classList.remove('zombie-theme');
  stopBlood();
  stopRain();
  stopLightning();

  document.body.classList.remove('heaven-theme');
  stopHeavenEffects();
  
  document.body.classList.remove('mcdonals-theme');

  document.body.classList.add('squid-game-theme');
  startSquidGameEffects();

  themeChanged = true;
});

document.getElementById('make-donalds').addEventListener('click', function() {
  document.body.classList.remove('snow-theme');
  stopSnow();
  snowing = false;
  
  document.body.classList.remove('zombie-theme');
  stopBlood();
  stopRain();
  stopLightning();

  document.body.classList.remove('heaven-theme');
  stopHeavenEffects();

  document.body.classList.remove('squid-game-theme');
  stopSquidGameEffects();

  document.body.classList.add('mcdonals-theme');

  themeChanged = true;
});
document.getElementById('make-abstract').addEventListener('click', function() {
  document.body.classList.remove('snow-theme');
  stopSnow();
  snowing = false;
  
  document.body.classList.remove('zombie-theme');
  stopBlood();
  stopRain();
  stopLightning();

  document.body.classList.remove('heaven-theme');
  stopHeavenEffects();

  document.body.classList.remove('squid-game-theme');
  stopSquidGameEffects();

  document.body.classList.remove('mcdonals-theme');

  document.body.classList.add('abstract-theme');

  ['crypto-prices', 'popup-window-1', 'music-player', 'support-window','rope'].forEach(key => {
    closeWindow(key);
});
  ['abs-wallet', 'abs-wallet-video','abs-wallet-video2'].forEach(key => {
    openWindow(key,"block");
});
  themeChanged = true;
});




document.getElementById('go-back').addEventListener('click', function() {
resetAllThemes();

['crypto-prices', 'popup-window-1', 'music-player', 'support-window'].forEach(key => {
  openWindow(key, "block");
});
openWindow('rope','flex');

['abs-wallet', 'abs-wallet-video', 'abs-wallet-video2'].forEach(key => {
  closeWindow(key);
});
});

// Reset Theme
document.getElementById('reset-theme').addEventListener('click', function() {
  resetAllThemes();
});

function resetAllThemes(){
  document.body.classList.remove('snow-theme');
  document.body.classList.remove('zombie-theme');
  document.body.classList.remove('heaven-theme');
  document.body.classList.remove('squid-game-theme');
  document.body.classList.remove('mcdonals-theme');
  document.body.classList.remove('shake-effect');
  document.body.classList.remove('abstract-theme');


  stopSnow();
  stopBlood();
  stopLightning();
  stopRain();
  stopHeavenEffects();
  stopSquidGameEffects();
  snowing = false;
  themeChanged = false;
}
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

// themeToggle butonunu kaldırabilirsiniz çünkü artık her tema için ayrı buton var

let lightningTimeout;

function startZombieEffects() {
  // Başlangıç kan efekti
  startBlood();
  
  // 6 saniye sonra kan efektini durdur
  setTimeout(() => {
      stopBlood();
  }, 6000);

  // Ekran sallama efektini ekle ve 6 saniye sonra kaldır
  document.body.classList.add('shake-effect');
  setTimeout(() => {
      document.body.classList.remove('shake-effect');
  }, 3000);

  // Şimşek ve yağmur efektini başlat
  setTimeout(() => {
      startRain();
      startLightning();
  }, 6500);
}
function startBlood() {
  for (let i = 0; i < 50; i++) {
      let blood = document.createElement('div');
      blood.className = 'blood';
      blood.style.left = Math.random() * window.innerWidth + 'px';
      blood.style.width = Math.random() * 5 + 2 + 'px';
      blood.style.height = Math.random() * 40 + 20 + 'px';
      blood.style.animationDuration = Math.random() * 3 + 2 + 's';
      document.body.appendChild(blood);
  }
}

function stopBlood() {
  let bloodDrops = document.getElementsByClassName('blood');
  while (bloodDrops.length > 0) {
      bloodDrops[0].parentNode.removeChild(bloodDrops[0]);
  }
}




function createLightning() {
  const lightning = document.createElement('div');
  lightning.className = 'lightning';
  document.body.appendChild(lightning);

  setTimeout(() => {
      lightning.remove();
  }, 150);
}

function startLightning() {
  function lightningLoop() {
      createLightning();
      // Rastgele aralıklarla şimşek çaktır (5-15 saniye arası)
      lightningTimeout = setTimeout(lightningLoop, Math.random() * 10000 + 5000);
  }
  lightningLoop();
}

function stopLightning() {
  clearTimeout(lightningTimeout);
  const lightnings = document.getElementsByClassName('lightning');
  while (lightnings.length > 0) {
      lightnings[0].parentNode.removeChild(lightnings[0]);
  }
}


function startRain() {
  for (let i = 0; i < 100; i++) {
      let raindrop = document.createElement('div');
      raindrop.className = 'rain';
      raindrop.style.left = Math.random() * window.innerWidth + 'px';
      raindrop.style.animationDuration = Math.random() * 0.5 + 0.5 + 's';
      raindrop.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(raindrop);
  }
}

function stopRain() {
  let raindrops = document.getElementsByClassName('rain');
  while (raindrops.length > 0) {
      raindrops[0].parentNode.removeChild(raindrops[0]);
  }
}

function startHeavenEffects() {
    startFeathers();
    startLightBeams();
    startSparkles();
    
    // Yumuşak bir parlaklık geçişi
    document.body.classList.add('heaven-glow');
}

function startFeathers() {
    for (let i = 0; i < 20; i++) {
        let feather = document.createElement('div');
        feather.className = 'feather';
        feather.style.left = Math.random() * window.innerWidth + 'px';
        feather.style.animationDuration = Math.random() * 5 + 10 + 's';
        feather.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(feather);
    }
}

function startLightBeams() {
    const beamContainer = document.createElement('div');
    beamContainer.className = 'light-beams';
    for (let i = 0; i < 5; i++) {
        let beam = document.createElement('div');
        beam.className = 'beam';
        beam.style.left = Math.random() * 100 + '%';
        beam.style.animationDelay = Math.random() * 4 + 's';
        beamContainer.appendChild(beam);
    }
    document.body.appendChild(beamContainer);
}
function stopLightBeams() {
  const beamContainers = document.querySelectorAll('.light-beams');
  beamContainers.forEach(container => {
      container.remove();
  });
}
function startSparkles() {
    for (let i = 0; i < 30; i++) {
        let sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.animationDuration = Math.random() * 2 + 1 + 's';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(sparkle);
    }
}

function stopHeavenEffects() {
    document.body.classList.remove('heaven-glow');
    stopLightBeams();
    // Tüm efektleri temizle
    ['feather', 'light-beams', 'sparkle'].forEach(className => {
        const elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    });

}

function startSquidGameEffects() {
  // Şekilleri oluştur
  createShapes();
  // Doll'u oluştur
  createDoll();
}

function createShapes() {
  const sections = 5;
  const shapes = [
    '../images/circle.png',    
    '../images/triangle.png',
    '../images/square.png'
  ];
  
  for (let i = 0; i < sections; i++) {
      for (let j = 0; j < sections; j++) {
          if (Math.random() > 0.3) {
              let shape = document.createElement('img');
              shape.className = 'squid-shape';
              shape.src = shapes[Math.floor(Math.random() * shapes.length)];
              
              // Her şekle random titreme animasyonu ata
              const shakeNum = Math.floor(Math.random() * 4) + 1;
              shape.dataset.shake = `shake${shakeNum}`;
              
              const sectionWidth = window.innerWidth / sections;
              const sectionHeight = window.innerHeight / sections;
              
              const left = (i * sectionWidth) + (Math.random() * sectionWidth);
              const top = (j * sectionHeight) + (Math.random() * sectionHeight);
              
              shape.style.left = `${left}px`;
              shape.style.top = `${top}px`;
              
              const size = Math.random() * 20 + 40;
              shape.style.width = `${size}px`;
              shape.style.height = `${size}px`;
              
              // Random animasyon gecikmesi
              shape.style.animationDelay = `${Math.random() * 5}s`;
              
              document.body.appendChild(shape);
          }
      }
  }
}


function createDoll() {
  const doll = document.createElement('div');
  doll.className = 'doll';
  document.body.appendChild(doll);
  
  // Doll'un dönme animasyonunu başlat
  startDollAnimation();
}

function startDollAnimation() {
  const doll = document.querySelector('.doll');
  // Önceki interval varsa temizle
  if (window.dollInterval) {
      clearInterval(window.dollInterval);
  }
  
  window.dollInterval = setInterval(() => {
      doll.classList.toggle('turned');
      document.body.classList.toggle('red-light');
      
      const shapes = document.querySelectorAll('.squid-shape');
      shapes.forEach(shape => {
          if (doll.classList.contains('turned')) {
              shape.style.animation = `${shape.dataset.shake} ${(Math.random() * 0.5 + 0.5)}s ease-in-out infinite`;
          } else {
              shape.style.animation = 'float 8s ease-in-out infinite';
          }
      });
  }, 5000);
}

function stopSquidGameEffects() {
  // Tüm şekilleri temizle
  const shapes = document.getElementsByClassName('squid-shape');
  while (shapes.length > 0) {
      shapes[0].parentNode.removeChild(shapes[0]);
  }
  
  // Doll'u temizle
  const doll = document.querySelector('.doll');
  if (doll) {
      doll.parentNode.removeChild(doll);
  }
  
  document.body.classList.remove('red-light');
}

function startDalgona() {
    const shapes = ['circle', 'triangle', 'square'];
    for (let i = 0; i < 15; i++) {
        let dalgona = document.createElement('div');
        dalgona.className = 'dalgona';
        dalgona.classList.add(shapes[Math.floor(Math.random() * shapes.length)]);
        dalgona.style.left = Math.random() * window.innerWidth + 'px';
        dalgona.style.top = Math.random() * window.innerHeight + 'px';
        dalgona.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(dalgona);
    }
}

function startShapes() {
    const maskContainer = document.createElement('div');
    maskContainer.className = 'mask-container';
    
    ['circle', 'triangle', 'square'].forEach(shape => {
        let maskShape = document.createElement('div');
        maskShape.className = `mask-shape ${shape}`;
        maskContainer.appendChild(maskShape);
    });
    
    document.body.appendChild(maskContainer);
}

function startRedLightGreenLight() {
    const doll = document.createElement('div');
    doll.className = 'doll';
    document.body.appendChild(doll);
    
    setInterval(() => {
        doll.classList.toggle('turned');
        document.body.classList.toggle('red-light');
        
        // Ses efekti (isteğe bağlı)
        if (doll.classList.contains('turned')) {
            playSound('../assets/music-player/squidgame.mp3'); // Oyundaki karakteristik şarkı
        }
    }, 5000); // Her 5 saniyede bir dön
}

function stopSquidGameEffects() {
  // Tüm şekilleri ve ilgili elementleri temizle
  const elementsToRemove = [
      '.squid-shape',
      '.doll',
      '.mask-container',
      '.light-beams',
      // Diğer squid game ile ilgili class'ları buraya ekleyebilirsiniz
  ];

  elementsToRemove.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => element.remove());
  });

  // Tüm tema ile ilgili class'ları kaldır
  document.body.classList.remove(
      'red-light',
      'squid-game-theme',
      'shake-effect'
  );

  // Varsa interval'ları temizle
  if (window.dollInterval) {
      clearInterval(window.dollInterval);
      window.dollInterval = null;
  }
}








//* Bongdoe popups

document.getElementById('hotdogsbat').addEventListener('click', function() {

  // Belirli pencereleri kapatıyoruz (varsayım: closeWindow fonksiyonu tanımlı)
  ['crypto-prices', 'popup-window-1', 'music-player', 'support-window'].forEach(key => {
      closeWindow(key);
  });

  let popupCount = 20;

  let bongdoeImages = [
      { image: "../images/doe.gif", description: 'Desc 1', link: "https://x.com/bongdoe" },
      { image: "../images/doe2.gif", link: "https://x.com/bongdoe/status/1866835787893162246" },
      { image: "../images/doe3.gif", link: "https://x.com/bongdoe/status/1876923875033747790" },
      { image: "../images/doe4.gif", link: "https://x.com/bongdoe" },
      { image: "../images/doe5.gif", link: "https://x.com/bongdoe" },
      { image: "../images/doe6.gif", link: "https://x.com/bongdoe" },
  ];

  for (let i = 0; i < popupCount; i++) {
      setTimeout(function () {
          createPopup(i);
      }, i * 200); // Her pencereyi 200ms arayla aç
  }

  function createPopup(index) {
      // Pencere oluştur
      let popup = document.createElement('div');
      popup.classList.add('hotdogsbat-window');

      // Rastgele pozisyon
      let left = Math.floor(Math.random() * (window.innerWidth - 320));
      let top = Math.floor(Math.random() * (window.innerHeight - 220));
      popup.style.left = left + 'px';
      popup.style.top = top + 'px';

      // Başlık oluştur
      let header = document.createElement('div');
      header.classList.add('hotdogsbat-header');
      header.textContent = 'Error';

      // Kapatma butonu
      let closeBtn = document.createElement('div');
      closeBtn.classList.add('hotdogsbat-close');
      closeBtn.addEventListener('click', function () {
          document.body.removeChild(popup);
      });

      header.appendChild(closeBtn);
      popup.appendChild(header);

      // İçerik oluştur
      let content = document.createElement('div');
      content.classList.add('hotdogsbat-content');

      if (index >= popupCount - bongdoeImages.length) {
          // Sanatçının eserlerini göster
          let imageIndex = index - (popupCount - bongdoeImages.length);
          let imageObj = bongdoeImages[imageIndex];

          let link = document.createElement('a');
          link.href = imageObj.link;
          link.target = '_blank';

          let img = document.createElement('img');
          img.src = imageObj.image;
          img.alt = imageObj.description || 'Picture';
          img.style.width = '100%';
          img.style.height = 'auto';

          link.appendChild(img);
          content.appendChild(link);
      } else {
          // Hata mesajı göster
          let message = document.createElement('p');
          message.textContent = 'Hacked by Doe...';
          content.appendChild(message);
      }

      popup.appendChild(content);
      document.body.appendChild(popup);

      makeDraggable(popup, header);
  }

  // Pencereyi sürüklenebilir yapmak için yardımcı fonksiyon
  function makeDraggable(popup, header) {
      let offsetX, offsetY;
      header.addEventListener('mousedown', mouseDownHandler);

      function mouseDownHandler(e) {
          offsetX = e.clientX - popup.offsetLeft;
          offsetY = e.clientY - popup.offsetTop;
          document.addEventListener('mousemove', mouseMoveHandler);
          document.addEventListener('mouseup', mouseUpHandler);
      }

      function mouseMoveHandler(e) {
          popup.style.left = `${e.clientX - offsetX}px`;
          popup.style.top = `${e.clientY - offsetY}px`;
      }

      function mouseUpHandler() {
          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
      }
  }


});
