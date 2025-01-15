const cmdLines = [
   "Initializing Hotdog cart...",
    "Loading mustard dispenser...",
    "Ketchup ready for action...",
    "Grilling sausages... 50% cooked",
    "Hotdog bun found... it's fresh!",
    "Adding relish... can never have enough",
    "Checking the ketchup level... low",
    "Mustard bottle slightly overfilled",
    "Prepping the onions... it's getting spicy",
    "Loading hotdog toppings... pickles incoming",
    "Grill master mode activated",
    "Setting the condiments station to 'savage'",
    "Hotdog assembly line ready",
    "Ready to wrap it all in a soft bun",
    "Sausages sizzling like a pro",
    "Mustard is too excited... calm down!",
    "Mustard on the left, ketchup on the right",
    "Relish knows no boundaries",
    "Hotdog taste test... results: delicious",
    "Grill flame set to 'just right'",
    "Placing pickles... precision is key",
    "Keeping the buns warm... can't serve cold buns",
    "Spicy mayo incoming... brace yourselves",
    "Hotdog: The king of street food",
    "Perfect hotdog: A symphony of flavors",
    "Hotdog assembly in progress... taste levels rising",
    "Grilled to perfection, now served with love",
    "Final check: Everything is hotdog-approved",
    "Buns looking extra fluffy today",
    "This hotdog just came from the future... it's that good",
    "Can we put more toppings on this hotdog? Absolutely",
    "Hotdog delivery confirmed... it's on the way!",
    "Hotdog magic happening... don't blink",
    "Final preparations... this is the hotdog of the century"
];

const statusMessages = [
    "Initializing system components...",
    "Loading system drivers...",
    "Configuring system settings...",
    "Loading user interface components...",
    "Preparing desktop environment...",
    "Finalizing system startup..."
];

let currentLine = 0;
const cmdText = document.getElementById('cmd-text');
const loaderContainer = document.getElementById('loader-container');
const progressBar = document.getElementById('progress-bar');
const statusText = document.getElementById('status-text');
const startText = document.getElementById('start-text');
const loaderOverlay = document.getElementById('loader-overlay');

// CMD ekranı animasyonu
function typeCmdLines() {
    if (currentLine < cmdLines.length) {
        cmdText.innerHTML += cmdLines[currentLine] + '\n';
        currentLine++;
        setTimeout(typeCmdLines, 90);
    } else {
        setTimeout(() => {
            document.getElementById('cmd-screen').style.display = 'none';
            loaderContainer.style.display = 'block';
            startLoader();
        }, 1000);
    }
}

// Loader ve durum mesajları
function startLoader() {
    let progress = 0;
    let messageIndex = 0;
    
    const progressInterval = setInterval(() => {
        if (progress < 100) {
            // Her seferinde 2 birim artırıyoruz (daha hızlı dolum için)
            progress += 2;
            progressBar.style.width = progress + '%';
            
            // Mesaj değişim aralığını da ayarlıyoruz
            if (progress % 20 === 0 && messageIndex < statusMessages.length) {
                statusText.textContent = statusMessages[messageIndex];
                messageIndex++;
            }
            
            if (progress >= 100) {
                progress = 100; // 100'ü geçmemesi için
                progressBar.style.width = '100%';
                setTimeout(() => {
                    statusText.style.display = 'none';
                    startText.style.display = 'block';
                    startCountdown();
                }, 500);
            }
        }
    }, 50); // Interval süresini 100ms'den 50ms'ye düşürdük
}
// Yeni geri sayım fonksiyonu ekliyoruz
function startCountdown() {
    let timeLeft = 5;
    const countdownElement = document.getElementById('countdown');
    
    const countdownInterval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.body.classList.add('loaded');
        }
    }, 1000);

    // Tuş basımını dinle
    document.addEventListener('keydown', () => {
        if (progressBar.style.width === '100%') {
            clearInterval(countdownInterval);
            document.body.classList.add('loaded');
        }
    });
}


// Tuş basımını dinle
document.addEventListener('keydown', () => {
    if (progressBar.style.width === '100%') {
        document.body.classList.add('loaded');
    }
});

// Başlat
typeCmdLines();
