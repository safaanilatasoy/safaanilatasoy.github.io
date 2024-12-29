document.addEventListener('DOMContentLoaded', (event) => {
  const cmdContent = document.querySelector('.fake-cmd .content');
  const cmdLine = document.querySelector('.fake-cmd .cmdline');
  const inputLine = document.querySelector('.fake-cmd .input-line');
  let countdown = 20; // Geri sayım başlangıç değeri
  let countdownInterval;
  let isCountingDown = false;
  // CMD açıldığında komut satırına odaklan
  focusCommandLine();

  cmdLine.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Varsayılan eylemi engelle (yeni satır)
      const inputText = cmdLine.textContent.trim();
      processCommand(inputText);
      cmdLine.textContent = ''; // Komut satırını temizle
    }
  });

  cmdLine.addEventListener('input', focusCommandLine);

  cmdContent.addEventListener('click', () => {
    focusCommandLine();
  });



  function processCommand(cmd) {
    // Komutu ekranda göster
    const commandLine = document.createElement('div');
    commandLine.className = 'line';
    commandLine.innerHTML = '<span class="prompt">C:\\Users\\User&gt;</span> ' + cmd;
    cmdContent.insertBefore(commandLine, inputLine);

    // Komutu işle ve yanıtı belirle
    let response = '';
    switch(cmd.toLowerCase()) {
      case 'help':
        startProcessSimulation(helpMessages);
        return;
      case 'dir':
        response = `
          Volume in drive C is OS<br/>
          Directory of C:\\Hotdog\\User<br/><br/>
          23/11/2023  10:12 AM    &lt;DIR&gt;          Documents<br/>
          23/11/2023  10:12 AM    &lt;DIR&gt;          Downloads<br/>
                         0 File(s)              0 bytes<br/>
                         2 Dir(s)  64,123,456,789 bytes free
                         (you can try ls, cd, cat, more, type, del, mkdir, rmdir, echo, and clear commands)
        `;
        break;
      case 'cls':
        // Ekranı komut satırı dışında temizle
        const lines = cmdContent.querySelectorAll('.line');
        lines.forEach(line => {
          if (!line.classList.contains('input-line')) {
            cmdContent.removeChild(line);
          }
        });
        // Ekran temizlendikten sonra odaklan
        focusCommandLine();
        return; // Fonksiyondan çık
      case 'exit':
        // CMD penceresini kapat
        const cmdWindow = document.getElementById('fake-cmd');
        cmdWindow.style.display = 'none';
        return;
      case 'process':
        startProcessSimulation(processMessages);
        return; 
      case 'help':
        startProcessSimulation(helpMessages);
        return; 
      case 'hex':
        startProcessSimulation(hex);
        return; 
      case 'grill':
        startProcessSimulation(grill);
        return; 
      case 'ketchup':
        startProcessSimulation(ketchup);
        return; 
      case 'hotdog3333':
        startCountdown();
        return; 
      case 'relish':
        giveCode();
        return; 
      default:
        response = `<span class="error">'${cmd}' is not recognized as an internal or external command, operable program or batch file.</span>`;
    }

    if (response) {
      // Yanıtı göster
      const responseLine = document.createElement('div');
      responseLine.className = 'line';
      responseLine.innerHTML = response;
      cmdContent.insertBefore(responseLine, inputLine);
    }

    // İçeriğin en altına kaydır
    cmdContent.scrollTop = cmdContent.scrollHeight;

    // Odaklanmayı sağlayın
    focusCommandLine();
  }

  const processMessages = [
    'Hotdog hack starting...',
    'Initializing Hotdog cart......',
    'Processing data...',
    'Loading hotdog toppings... pickles incoming...',
    "Hotdog magic happening... don't blink use ipmap",
    "Hotdog delivery confirmed... it's on the way!",
  ];
  const helpMessages = [
    "Heat Every Xtra Topping On Sausages, Then Relish Every Ingredient's Natural Greatness.",
  ];
  const hex = [
    '>> 0x626271',
    '>> 0x736d6f6b65',
    '>> 0x6772696c6c',
    '>> 0x62756e',
    '>> 0x6d757374617264',
  
  ];

  const grill = [
    "<span style='color: #fbc531'>Relish (1) AND <span style='color:#fbc531;'>Mustard (0)</span> OR <span style='color:#fbc531;'>Ketchup (1)</span> = ?",
  ];



  const ketchup = [
    '>> fry1234',
    '>> grill_boss',
    '>> sausge4life',
    '>> 0x736f736974354353',
    '>> lets_eat_sausage',
    '>> bun_mania',
    '>> smoke_it_up',
    '>> spicy_bites',
    '>> bbq_rider',
    '>> 686f74646f6733333333',
    '>> crunchy_pickles',

  ];

  

  const hotdog3333 = [
    'Available commands: help, dir, cls, exit, process',
  ];

  function startProcessSimulation(messagesArray) {
    let index = 0;

    function displayNextMessage() {
      if (index < messagesArray.length) {
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = messagesArray[index];
        cmdContent.insertBefore(line, inputLine);
        scrollToBottom();
        index++;
        setTimeout(displayNextMessage, 1000); // Her mesaj 1 saniye arayla gösterilir
      } else {
        // İşlem bittiğinde odaklan
        focusCommandLine();
      }
    }

    displayNextMessage();
  }

  function scrollToBottom() {
    cmdContent.scrollTop = cmdContent.scrollHeight;
  }
  function startCountdown() {
    const cmdContent = document.querySelector('.fake-cmd .content');
    const countdownMessage = document.createElement('div');
    countdownMessage.className = 'line';
    cmdContent.appendChild(countdownMessage);

    countdownMessage.innerHTML = `Countdown: ${countdown} seconds remaining.`;
    cmdContent.scrollTop = cmdContent.scrollHeight;

    countdownInterval = setInterval(() => {
      countdown--;
      countdownMessage.innerHTML = `rElIsH dOesn'T LiKe musTard buT saUsages Do. <br/> <br/> <span style="color:red; font-weight:bold;">Warning!! System is down in : ${countdown} seconds please enter save code...</span>`;

      if (countdown <= 0) {
        clearInterval(countdownInterval);
        restartPage();
      }
    }, 1000);
  }

  function restartPage() {
    location.reload(); // Sayfayı yeniden yükler
  }
  function giveCode(){
    stopCountdown();
    const cmdContent = document.querySelector('.fake-cmd .content');
    const codeMessage = document.createElement('div');
    codeMessage.className = 'line';
    cmdContent.appendChild(codeMessage);

    codeMessage.innerHTML = `Code: h0td0gsc0mings00n`;
   
  }

  function stopCountdown() {
    clearInterval(countdownInterval);
    isCountingDown = false;

    const cmdContent = document.querySelector('.fake-cmd .content');
    const stopMessage = document.createElement('div');
    stopMessage.className = 'line';
    stopMessage.innerHTML = `<span class="success">Countdown stopped successfully!</span>`;
    cmdContent.appendChild(stopMessage);
    cmdContent.scrollTop = cmdContent.scrollHeight;
  }

});

window.focusCommandLine = function() {
    const cmdLine = document.querySelector('.fake-cmd .cmdline');
    if (cmdLine) {
      cmdLine.focus();
  
      // İmleci metnin sonuna taşı
      const range = document.createRange();
      range.selectNodeContents(cmdLine);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      console.error('cmdLine öğesi bulunamadı');
    }
  };
  

 


