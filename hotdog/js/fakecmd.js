document.addEventListener('DOMContentLoaded', (event) => {
  const cmdContent = document.querySelector('.fake-cmd .content');
  const cmdLine = document.querySelector('.fake-cmd .cmdline');
  const inputLine = document.querySelector('.fake-cmd .input-line');
  let currentDirectory = 'C:\\Hotdogs\\User';

  // cmdLine'ı yapılandır
  if (cmdLine) {
    cmdLine.setAttribute('contenteditable', 'true');
    cmdLine.setAttribute('spellcheck', 'false');
    cmdLine.style.minWidth = '1px';
    cmdLine.style.outline = 'none';
  }

  // Event Listeners
  cmdLine.addEventListener('keydown', async function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = this.textContent.trim();
      await processCommand(command);
      this.textContent = '';
      focusCommandLine();
    }
  });

  // Tıklama olayını yönet
  cmdContent.addEventListener('click', (e) => {
    focusCommandLine();
  });

  // Yapıştırma olayını yönet
  cmdLine.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  });

  // İlk yüklemede odaklan
  focusCommandLine();
});

let puzzleState = {
  clue1Found: false,
  clue2Found: false,
  clue3Found: false,
  clue4Found: false,
  gameCompleted: false,
  inventoryItems: [],
  attempts: 0,
  timeStarted: null
};

const PUZZLE_MESSAGES = {
  clue1: "MORSE: .... . .-.. .-.. ---", // "HELLO"
  clue2: "ROT13: QRGRPGVIR", // "DETECTIVE"
  clue3: "REVERSE: ESACWOHS", // "SHOWCASE"
  clue4: "FINAL CODE: 1234" // Basit bir final kodu
};

// CSS ekle
const style = document.createElement('style');
style.textContent = `
  .fake-cmd .cmdline {
    display: inline-block;
    min-width: 1px;
    outline: none;
    white-space: pre-wrap;
    margin-left: 5px;
    color: #ffffff;
  }

  .fake-cmd .prompt {
    user-select: none;
    color: #ffffff;
  }

  .fake-cmd .blinking-cursor {
    display: inline-block;
    width: 8px;
    height: 15px;
    background: #ffffff;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .line {
    margin: 2px 0;
  }

  .loading {
    color: #0f0;
  }

  .matrix {
    color: #0f0;
    text-shadow: 0 0 5px #0f0;
  }
`;
document.head.appendChild(style);

// focusCommandLine fonksiyonunu güncelle
function focusCommandLine() {
  const cmdLine = document.querySelector('.fake-cmd .cmdline');
  if (cmdLine) {
    cmdLine.focus();
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(cmdLine);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function showStatus() {
  const timeElapsed = puzzleState.timeStarted ? Math.floor((Date.now() - puzzleState.timeStarted) / 1000) : 0;
  
  let status = `
🖥️ CYBER K9 TERMINAL STATUS 🐕
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Progress:
${puzzleState.systemScanned ? '✅' : '❌'} Port Scan Complete
${puzzleState.passwordCracked ? '✅' : '❌'} Hex Code Decoded
${puzzleState.firewallBypassed ? '✅' : '❌'} Firewall Bypassed
${puzzleState.dataDecrypted ? '✅' : '❌'} Base64 Decrypted
${puzzleState.gameCompleted ? '✅' : '❌'} System Access Gained

Stats:
⏱️ Time Elapsed: ${timeElapsed} seconds
🎯 Attempts: ${puzzleState.attempts}
📦 Items Collected: ${puzzleState.inventoryItems.length}

Next Step:
${getNextStep()}
`;
  showResponse(status);
}

function getNextStep() {
  if (!puzzleState.systemScanned) {
      return "Try 'scan ports' to begin your investigation";
  } else if (!puzzleState.passwordCracked) {
      return "Found hex data. Try 'decode hex'";
  } else if (!puzzleState.firewallBypassed) {
      return "Study the firewall pattern and use 'bypass firewall [pattern]'";
  } else if (!puzzleState.dataDecrypted) {
      return "Found Base64 data. Use 'decrypt base64'";
  } else if (!puzzleState.gameCompleted) {
      return "System ready for login. Use 'login [password]'";
  } else {
      return "Mission Completed! 🎉";
  }
}

function getNextStep() {
  if (!puzzleState.foundFirstClue) {
      return "Try using 'scan' to begin your investigation";
  } else if (!puzzleState.decryptedBinary) {
      return "hmm what is this numbers?";
  } else if (!puzzleState.solvedCipher) {
      return "Correct key is important";
  } else if (!puzzleState.foundCoordinates) {
      return "Locate the hotdog stand coordinates";
  } else if (!puzzleState.accessedMainframe) {
      return "solve the mainframe sequence";
  } else if (!puzzleState.gameCompleted) {
      return "Solve the final riddle";
  } else {
      return "Mission Completed! 🎉";
  }
}
// showCommand ve showResponse fonksiyonlarını ekleyelim
function showCommand(cmd) {
  const commandLine = document.createElement('div');
  commandLine.className = 'line';
  commandLine.innerHTML = `<span class="prompt">C:\\Hotdogs\\User&gt;</span> ${cmd}`;
  const inputLine = document.querySelector('.input-line');
  inputLine.parentNode.insertBefore(commandLine, inputLine);
}

function showResponse(text) {
  const responseLine = document.createElement('div');
  responseLine.className = 'line';
  responseLine.innerHTML = text;
  const inputLine = document.querySelector('.input-line');
  inputLine.parentNode.insertBefore(responseLine, inputLine);
  
  // Scroll to bottom
  const cmdContent = document.querySelector('.fake-cmd .content');
  cmdContent.scrollTop = cmdContent.scrollHeight;
}

function showError(text) {
  const errorLine = document.createElement('div');
  errorLine.className = 'line error';
  errorLine.style.color = 'red';
  errorLine.textContent = text;
  const inputLine = document.querySelector('.input-line');
  inputLine.parentNode.insertBefore(errorLine, inputLine);
}
async function showSuccessAnimation() {
  await showMatrixEffect(1000);
  const hotdogArt = `
  🌭 HOTDOG MASTER 🌭
     ___________
    /           \\
   /             \\
  |   COMPLETED   |
   \\             /
    \\_________/
  `;
  showResponse(hotdogArt);
}
cmdLine.addEventListener('keydown', async function(e) {
  if (e.key === 'Enter') {
      e.preventDefault();
      const command = this.textContent.trim();
      if (command) { // Boş komutları engelle
          await processCommand(command);
          this.textContent = '';
          const cmdContent = document.querySelector('.fake-cmd .content');
          cmdContent.scrollTop = cmdContent.scrollHeight;
      }
      focusCommandLine();
  }
});
// Komut işleme fonksiyonu
async function processCommand(cmd) {
  const args = cmd.toLowerCase().split(' ');
  const command = args[0];

  showCommand(cmd);
  puzzleState.attempts++;

  try {
      switch(command) {
        case 'help':
          showResponse(`
      🔍 Detective's Commands 🔍
      ────────────────────────
      investigate     - Search for clues
      morse [word]    - Decode morse code
      rot13 [word]    - Decode ROT13 cipher
      reverse [word]  - Solve reversed text
      code [number]   - Enter the final code
      status          - Check investigation progress
      inventory       - Check collected clues
      clear           - Clear screen
    
          `);
          break;
                  // hint     - Get a hint (costs time penalty)

// processCommand fonksiyonuna eklenecek case:
case 'investigate':
    if (!puzzleState.clue1Found) {
        await showLoadingBar(2000, 'Searching for clues');
        puzzleState.clue1Found = true;
        puzzleState.timeStarted = Date.now();
        showResponse(`
🔍 First clue found!
${PUZZLE_MESSAGES.clue1}
Try to decode this morse code...
        `);
        puzzleState.inventoryItems.push('morse_code');
    } else {
        showResponse("You've already found the first clue.");
    }
    break;

case 'morse':
    if (!puzzleState.inventoryItems.includes('morse_code')) {
        showError("No morse code found. Try investigating first!");
        return;
    }
    if (args[1]?.toLowerCase() === 'hello') {
        puzzleState.clue2Found = true;
        showResponse(`
✨ Correct! You decoded the morse code!
New clue revealed: ${PUZZLE_MESSAGES.clue2}
This looks like a ROT13 cipher...
        `);
        puzzleState.inventoryItems.push('rot13_cipher');
    } else {
        showError("That's not the correct morse translation.");
    }
    break;

case 'rot13':
    if (!puzzleState.inventoryItems.includes('rot13_cipher')) {
        showError("No ROT13 cipher found yet!");
        return;
    }
    if (args[1]?.toLowerCase() === 'detective') {
        puzzleState.clue3Found = true;
        showResponse(`
🎯 Well done! ROT13 decoded!
Found new clue: ${PUZZLE_MESSAGES.clue3}
Try reading this backwards...
        `);
        puzzleState.inventoryItems.push('reverse_text');
    } else {
        showError("That's not the correct ROT13 solution.");
    }
    break;

case 'reverse':
    if (!puzzleState.inventoryItems.includes('reverse_text')) {
        showError("No reversed text found yet!");
        return;
    }
    if (args[1]?.toLowerCase() === 'showcase') {
        puzzleState.clue4Found = true;
        showResponse(`
🔓 Excellent! Text reversed successfully!
Final clue revealed: ${PUZZLE_MESSAGES.clue4}
Enter this code to complete the investigation.
        `);
        puzzleState.inventoryItems.push('final_code');
    } else {
        showError("That's not the correct reversed word.");
    }
    break;

case 'code':
    if (!puzzleState.inventoryItems.includes('final_code')) {
        showError("You haven't found the final code yet!");
        return;
    }
    if (args[1] === '1234') {
        await completeGame();
    } else {
        showError("Incorrect code!");
    }
    break;

          case 'inventory':
              showInventory();
              break;

          case 'status':
              showStatus();
              break;

          // case 'hint':
          //     showHint();
          //     break;

          case 'cls':
              clearScreen();
              break;

          default:
              showError("Command not recognized. Type 'help' for available commands.");
      }
  } catch (error) {
      showError("An error occurred: " + error.message);
  }
}
function showInventory() {
  let inventory = "📦 Inventory Items:\n";
  puzzleState.inventoryItems.forEach(item => {
      inventory += `- ${item.replace(/_/g, ' ').toUpperCase()}\n`;
  });
  showResponse(inventory);
}

function showHint() {
  // Her ipucu 30 saniye zaman cezası ekler
  const timePenalty = 30000;
  puzzleState.timeStarted += timePenalty;
  
  let hint = "🔍 HINT: ";
  if (!puzzleState.foundFirstClue) {
      hint += "Try using the 'scan' command first.";
  } else if (!puzzleState.decryptedBinary) {
      hint += "The 'binary convert' command might help with that sequence.";
  } else if (!puzzleState.solvedCipher) {
      hint += "Vigenère cipher needs a key. Try 'decrypt vigenere [key]'.";
  } else if (!puzzleState.foundCoordinates) {
      hint += "Where might a hotdog stand be? Try 'locate hotdog stand'.";
  } else if (!puzzleState.accessedMainframe) {
      hint += "The sequence is related to common hotdog toppings.";
  } else {
      hint += "Think about what makes a hotdog unique...";
  }
  
  showResponse(hint + "\n(30 seconds added to your time)");
}

async function completeGame() {
  puzzleState.gameCompleted = true;
  const timeElapsed = Math.floor((Date.now() - puzzleState.timeStarted) / 1000);
  const score = calculateScore(timeElapsed, puzzleState.attempts);
  
  await showSuccessAnimation();
  showResponse(`
      🎉 ACCESS GRANTED! Welcome to K9 Cyber Security Unit! 🐕
      
      ┌────────────────────────────┐
      │   MISSION ACCOMPLISHED!    │
      │                           │
      │   Time: ${timeElapsed} seconds    │
      │   Attempts: ${puzzleState.attempts}          │
      │   Score: ${score}/100         │
      │                           │
      │   K9-AGENT-${Math.random().toString(36).substr(2, 6).toUpperCase()}   │
      └────────────────────────────┘

      Final Code: d4fv8H0tDoGs21532 🦴
  `);
}

function calculateScore(time, attempts) {
  const baseScore = 100;
  const timeDeduction = Math.floor(time / 60) * 5; // Her dakika için 5 puan düşür
  const attemptDeduction = Math.floor(attempts / 10) * 2; // Her 10 deneme için 2 puan düşür
  return Math.max(0, baseScore - timeDeduction - attemptDeduction);
}
// Yardımcı fonksiyonlar
async function showLoadingBar(duration, message) {
  return new Promise(resolve => {
    const loadingLine = document.createElement('div');
    loadingLine.className = 'line loading';
    const inputLine = document.querySelector('.input-line');
    inputLine.parentNode.insertBefore(loadingLine, inputLine);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      loadingLine.innerHTML = `${message} [${'='.repeat(progress)}${' '.repeat(20-progress)}] ${progress*5}%`;
      
      if (progress >= 20) {
        clearInterval(interval);
        setTimeout(resolve, 200);
      }
    }, duration/20);
  });
}

function clearScreen() {
  const content = document.querySelector('.fake-cmd .content');
  const inputLine = document.querySelector('.input-line');
  const lines = content.querySelectorAll('.line:not(.input-line)');
  lines.forEach(line => content.removeChild(line));
}

// Matrix efekti
async function showMatrixEffect(duration) {
  return new Promise(resolve => {
    const matrixLine = document.createElement('div');
    matrixLine.className = 'line matrix';
    const inputLine = document.querySelector('.input-line');
    inputLine.parentNode.insertBefore(matrixLine, inputLine);

    let counter = 0;
    const interval = setInterval(() => {
      let matrixText = '';
      for(let i = 0; i < 50; i++) {
        matrixText += "HOTDOG"[Math.floor(Math.random() * 6)];
      }
      matrixLine.textContent = matrixText;
      
      counter++;
      if(counter >= 20) {
        clearInterval(interval);
        setTimeout(resolve, 200);
      }
    }, duration/20);
  });
}