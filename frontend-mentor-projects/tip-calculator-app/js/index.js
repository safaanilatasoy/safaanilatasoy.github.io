const billInput = document.getElementById('bill-input');
const customInput = document.querySelector('#custom-input');
const numberOfPeopleInput = document.querySelector('#number-of-people-input');
const tipButtons = document.querySelectorAll('.tip-item button')
const percentageButton = document.querySelectorAll('.percentageButton');
const numberOfPeopleInputErrorTitle = document.querySelector('#number-of-people-error');
const tipAmountElement = document.querySelector('#tip-amount');
const totalAmountElement = document.querySelector('#total-amount');

const calculate = () => {
    const billValue = parseInt(billInput.value)
    const percent = parseInt(customInput.value)
    const numberOfPeople = parseInt(numberOfPeopleInput.value)

    if(numberOfPeople > 0 && percent > 0 && billValue > 0) {
        const totalTip = (billValue * percent ) / 100
        tipAmountElement.textContent ="$" +(totalTip / numberOfPeople).toFixed(2)
        totalAmountElement.textContent ="$" + ( ( billValue + totalTip ) / numberOfPeople ).toFixed(2)
    } 
}

const createEventListeners = () => {
    percentageButton.forEach((button) => {
      button.addEventListener('click', () => {
        const buttonText = button.value;
        customInput.value = buttonText;
        
        percentageButton.forEach((btn) => {
            btn.classList.remove('active');
        })
        button.classList.add('active');
        calculate();

      })
  })

 
  customInput.addEventListener('input', () => {
      percentageButton.forEach((btn) => {
          btn.classList.remove('active');
      })
  })

    billInput.addEventListener('input', () => {
        billAmount = parseInt(billInput.value);
    });

    tipButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;
            tipPercentage = parseInt(buttonText.split("%")[1]);            
        });
    });
    
    //RESET button
    const resetBtn = document.querySelector('#reset-button');

    resetBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        billInput.value = '';
        customInput.value = ''
        numberOfPeopleInput.value = ''
        billInput.style.border = 'none'
        customInput.style.border = 'none'
        numberOfPeopleInput.style.border = 'none'
        
        percentageButton.forEach((btn) => {
            btn.classList.remove('active');
        })
    })

    //Input validation

    const validateInput = (node, errorTitleNode) => {
        const changeErrorNodeDisplay = (newClass) => {
            console.log('errorTitleNode: ', typeof errorTitleNode);
            console.log('newClass: ', newClass);
            if(errorTitleNode != undefined) {
                errorTitleNode.className = newClass;
            }
        }
        console.log('node.value: ', node.value);
        if(node.value === '0') {
            node.style.border = '1px solid red'
            changeErrorNodeDisplay('errorTitleShow')
        } else if (node.value) {
            node.style.border = '1px solid green'
            changeErrorNodeDisplay('errorTitleHide')
        } else {
            node.style.border = 'none'
            changeErrorNodeDisplay('errorTitleHide')
        }
    }

    billInput.addEventListener('input', async (event) => {
        event.preventDefault();
        validateInput(billInput);
        calculate();
    });
    
    customInput.addEventListener('input', async (event) => {
        event.preventDefault();
        validateInput(customInput);
        calculate();
    });
    
    numberOfPeopleInput.addEventListener('input', async (event) => {
        event.preventDefault();
        validateInput(numberOfPeopleInput, numberOfPeopleInputErrorTitle);
        calculate();
    });


    // form submit

    
}

const init = () => {
    createEventListeners();

}

init();