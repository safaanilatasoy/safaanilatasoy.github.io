
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
      ? '<i class="fa-solid fa-check" style="color: #3cbe19;"></i>'
      : '<i class="fa-solid fa-xmark" style="color: #cb1010;"></i>';
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
  var menu = document.getElementById("menu");
  menu.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  const storedLoadingTime = sessionStorage.getItem("loadingTime");
  if (storedLoadingTime) {
    const loadingTimeInput = document.getElementById("loadingTime");
    loadingTimeInput.value = storedLoadingTime;
  }
});

