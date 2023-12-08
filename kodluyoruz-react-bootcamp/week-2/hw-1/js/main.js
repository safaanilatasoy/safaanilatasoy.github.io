
// Data API URL
const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";

const loadingElement = document.getElementById("loading");
const resultTable = document.querySelector(".table");

let loadingTime = sessionStorage.getItem("loadingTime");

resultTable.style.display = "none";
loadingElement.style.display = "block";

// GET DATA Func
getData(loadingTime);

function getData(loadingTime) {
  setTimeout(() => {
    // Fetching Data
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const dataList = document.getElementById("dataList");

        data.map((user) => {
          loadingElement.style.display = "none";
          resultTable.style.display = "block";
          const tr = document.createElement("tr");

          tr.innerHTML = `
                            <td scope="row">${user.id}</td>
                            <td>${user.title}</td>
                            <td>
                            ${
                              user.completed
                                ? '<i class="fa-solid fa-check" style="color: #3cbe19;"></i>'
                                : '<i class="fa-solid fa-xmark" style="color: #cb1010;"></i>'
                            }
                            </td>
                        `;

          dataList.appendChild(tr);
        });
      });
  }, loadingTime);
}

function submitForm() {
  // Title input
  const title = document.getElementById("title").value;

  // Checkbox input
  const isCompleted = document.getElementById("isCompleted").checked;

  // Result table content
  const dataList = document.getElementById("dataList");
  const row = dataList.insertRow();

  // if title is full then push
  if (title !== "") {
    document.getElementById("alertText").innerHTML = "";
    // User ID, Title and Completed tables
    const cellID = row.insertCell(0);
    const cellTitle = row.insertCell(1);
    const cellChecked = row.insertCell(2);

    // ID Automatically incrementing
    cellID.innerHTML = dataList.rows.length;

    cellTitle.innerHTML = title;
    cellChecked.innerHTML = isCompleted
      ? '<i id="check" class="fa-solid fa-check" style="color: #3cbe19;"></i>'
      : '<i id="xmark" class="fa-solid fa-xmark" style="color: #cb1010;"></i>';
  } else {
    // Alert text variable
    const alertText = (document.getElementById("alertText").innerHTML =
      "<span>You entered incomplete information, please try again.<span>");
  }

  // Form Cleaning
  document.getElementById("dataForm").reset();
}

// Settings Menu Display
function toggleMenu() {
  var menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// settings form button
function sendSettingsForm() {
  const loadingTimeValue = document.getElementById("loadingTime").value;
  sessionStorage.setItem("loadingTime", loadingTimeValue);
}


document.addEventListener("DOMContentLoaded", function () {

  // hide and show for settings menu
  var menu = document.getElementById("menu");
  menu.style.display = "none";

  // Keeping the loading time input in the settings menu
  const storedLoadingTime = sessionStorage.getItem("loadingTime");
  if (storedLoadingTime) {
    const loadingTimeInput = document.getElementById("loadingTime");
    loadingTimeInput.value = storedLoadingTime;
  }


// **** Changing the icon in the table ****
// Event listener for isChecked column
  resultTable.addEventListener("click", function (event) {
    const target = event.target;

    
      const checkIcon = target.classList.contains("fa-check");
      const xmarkIcon = target.classList.contains("fa-xmark");
      const row = target.closest("tr");

      const cellChecked = row.querySelector("td:nth-child(3)");
        if (checkIcon) {
          cellChecked.innerHTML = '<i id="xmark" class="fa-solid fa-xmark" style="color: #cb1010;"></i>';
        } else {
          cellChecked.innerHTML = '<i id="check" class="fa-solid fa-check" style="color: #3cbe19;"></i>';
        }
      
    
  });

});


