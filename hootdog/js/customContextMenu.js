const contextMenu = document.getElementById("context-menu");

// Sağ tık olayını dinle
document.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // Varsayılan sağ tık menüsünü engelle

    // Menü konumunu belirle
    const { clientX: mouseX, clientY: mouseY } = event;

    // Menü ekranın dışında taşmamalı
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const posX = mouseX + menuWidth > screenWidth ? screenWidth - menuWidth : mouseX;
    const posY = mouseY + menuHeight > screenHeight ? screenHeight - menuHeight : mouseY;

    contextMenu.style.left = `${posX}px`;
    contextMenu.style.top = `${posY}px`;
    contextMenu.style.display = "block";
});

// Menüyü kapat
document.addEventListener("click", () => {
    contextMenu.style.display = "none";
});
