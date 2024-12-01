const consoleMessages = [
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


const asciiArt = `
                                 @@@@@@@@@@@@@@@@@@@@@@@@@@                                     
                                 @@@@@@@@@@@@@@@@@@@@@@@@@@                                     
                         @@@@@@@@***************%%%*=======%@@@@@@%                             
                         @@@@@@@@***************%%%*=======%@@@@@@%                             
                      @@@#******************+===++++***====+++++++#@@@                          
                      @@@#******************=======+***===========*@@@                          
                  %@@%=======****#%%#***+==========+***=======+@@@#***%@@@                      
                  @@@%=======****%%%#***+==========+***=======+@@@#***@@@@                      
              %%%%++++=======#%%%###****+===========+++========+++#%%%####%%%@                  
              %@@@+==========#@@@*******+=========================*@@@***#@@@@                  
              %@@@+======*%%%####*******#%%%%%%#===========%%%%%%%%@@@***#@@@@                  
              %@@@+======*@@@#**********#@@@@@@%===========%@@@@@@@@@@***#@@@@                  
          @@@@%###=======*@@@#*******###+===%@@%+++++++++++===+@@@%###%%%#***#@@@@              
          @@@@%***=======*@@@#*******%%%=   %@@%***********.  :@@@#***@@@%===#@@@@              
          @@@@%***=======*@@@#*******%%%=   %@@%***********.  :@@@#***@@@%===#@@@@              
          @@@@%***=======*@@@#*******%%%=   %@@%***********.  :@@@#***@@@%===#@@@@              
          @@@@%***=======*@@@#*******###+===%@@%****+++++++===+@@@#***@@@%===#@@@@              
          @@@@%***=======*@@@#**********#@@@@@@%***+=======%@@@@@@#***@@@%===#@@@@              
          @@@@%***=======*@@@#**********#%%%%%%#***********%%%%%%%*+++%@@%===#@@@@              
          @@@@%***=======*@@@#*********************#@@@@@@@%%%#***+===%@@%===#@@@@              
          @@@@%***++++===*%%%####******************#@@@@@@@%%%#***+===%@@%+++#@@@@              
          @@@@%*******=======#@@@***********=======*@@@@@@@@@@%=======%@@%***%@@@@              
          @@@@%*******=======#@@@####*******=======*###########=======%@@%***%@@@@              
          @@@@%*******=======#@@@%%%#***+=============================%@@%***%@@@@              
          %@@@%*******=======#@@%%%%%***+=============================%@@%***%@@@@              
              %@@@***************%@@@%%%*==========*@@@@@@@@@@%===+***@@@%***%@@@@              
              %@@@***************%@@@%%%*+++=======*%%%%%%%@@@%===+###%%%%***%@@@@              
              %@@@***************%@@@   %@@@+======*#######@@@%***#@@@*******%@@@@              
              %@@@***************%@@@   %@@@+======*#######%@@%***#@@@*******%@@@@              
                  @@@%*******%@@@%          @@@@@@@@@@@*+++===+@@@%   @@@@@@@@                  
                  @@@@*******%@@@%          @@@@@@@@@@@*+++===+@@@%   @@@@@@@@                  
                      @@@@@@@@                     %@@@*++++++*@@@%                             
                      @@@@@@@@                     %@@@*++++++*@@@%                             
                                                       @@@@@@@@                                 
                                                       @@@@@@@@   
                                                       
                                                       
                                            System Starting.....
`;


const consoleSimulation = document.getElementById("console-simulation");
const consoleOutput = document.getElementById("console-output");
const loaderBar = document.getElementById("loader-bar");
const asciiContainer = document.getElementById("ascii-art");

let currentMessage = 0;
let asciiLines = asciiArt.split("\n");
let currentAsciiLine = 0;

function displayNextConsoleMessage() {
    if (currentMessage < consoleMessages.length) {
        consoleOutput.textContent += consoleMessages[currentMessage] + "\n";
        currentMessage++;
        setTimeout(displayNextConsoleMessage, 200); // Mesajlar 200ms'de bir gösterilecek
    } else {
        showLoader();
    }
}

function showLoader() {
    loaderBar.style.display = "block";
    consoleOutput.style.display = "none";
    setTimeout(showAsciiArt, 3000); // Yüklenme çubuğu 3 saniye görünecek
}

function showAsciiArt() {
    loaderBar.style.display = "none";
    asciiContainer.style.display = "block";
    displayAsciiLineByLine();
}

function displayAsciiLineByLine() {
    if (currentAsciiLine < asciiLines.length) {
        asciiContainer.textContent += asciiLines[currentAsciiLine] + "\n";
        currentAsciiLine++;
        setTimeout(displayAsciiLineByLine, 100); // Her satır 100ms'de bir gösterilecek
    } else {
        setTimeout(() => {
            consoleSimulation.style.display = "none";
            // 3 saniye sonra yönlendirme
        }, 3000);
    }
}

displayNextConsoleMessage();
