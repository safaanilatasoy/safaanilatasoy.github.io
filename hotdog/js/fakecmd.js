document.addEventListener('DOMContentLoaded', (event) => {
  const cmdContent = document.querySelector('.fake-cmd .content');
  const cmdLine = document.querySelector('.fake-cmd .cmdline');
  const inputLine = document.querySelector('.fake-cmd .input-line');

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
      case 'ipmap':
        startProcessSimulation(ipmap);
        return; 
      case 'tskr567afsdd':
        startProcessSimulation(TSKR567afsdD);
        return; 
      case 'breakhotdogcode':
        startProcessSimulation(breakIP);
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
  const ipmap = [
    '>> 432.543.534.765 == Code: pxtmywc3@vbs3',
    '>> 876.435.324.867 == Code: mf^cod$gb7h8@',
    '>> 432.645.876.987 == Code: x%w6s4gn96sbs',
    '>> 443.645.657.768 == Code: 2#m72f$dk$^np',
    '>> 192.123.321.536 == Code: tskr567afsdd',
    '>> 432.645.876.867 == Code: f6$t#d8u2xdc3',
    '>> 423.564.756.354 == Code: taqal2s&9$pyx',
  
  ];

  const TSKR567afsdD = [
    "Searching for tskr567afsdd...",
    "tskr567afsdd found...",
    "you are close to the hotdog code...",
    ".",
    "..",
    "..",
    ".......",
    "............",
    "use Search breakhotdogcode to find the code",
  ];



  const breakIP = [
    '>> 432.543.534.765 == Code: pxtmywc + (999 + 2 * 364 ) % 2',

  ];

  

  const helpMessages = [
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