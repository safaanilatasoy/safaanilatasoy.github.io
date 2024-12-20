function updateClock() {
    const clockElement = document.getElementById("taskbarClock");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    clockElement.textContent = `${hours}:${minutes}`;
  }
  
  // Saat her saniye güncellenir
  setInterval(updateClock, 1000);
  
  // Sayfa yüklendiğinde ilk kez saat güncellenir
  updateClock();