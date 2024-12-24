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
      case 'mrhackerdog':
        startProcessSimulation(getCode);
        return;
      case 'cd code':
        startProcessSimulation(getCode2);
        return;
      case 'dir':
        response = `
          Volume in drive C is OS<br/>
          Directory of C:\\Hotdog\\User<br/><br/>
          23/11/2023  10:12 AM    &lt;DIR&gt;          Documents<br/>
          23/11/2023  10:12 AM    &lt;DIR&gt;          Downloads<br/>
          24/11/2023  10:12 AM    &lt;DIR&gt;         <span class="error"> Code </span><br/>
                         0 File(s)              0 bytes<br/>
                         2 Dir(s)  64,123,456,789 bytes free
                         (you can try ls, cd "word", cat, more, , type, del, mkdir, rmdir, echo, and clear commands)
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
        return; // İşlem simülasyonu başladığı için fonksiyondan çıkıyoruz
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
    "Hotdog magic happening... don't blink",
    "Hotdog delivery confirmed... it's on the way!",
    'use mrhackerdog'
  ];

  const getCode = [
    'Hotdog code: 1234-5678-9101-1121',

  ];

  const getCode2 = [
    'Hotdog code: 3443-5435-5345-4325',

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