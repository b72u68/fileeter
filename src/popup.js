let title = document.getElementById("title");

let applyBtn = document.getElementById("applyBtn");
let clearBtn = document.getElementById("clearBtn");
let themeBtn = document.getElementById("themeBtn");

let easyOption = document.getElementById("easyOption");
let mediumOption = document.getElementById("mediumOption");
let hardOption = document.getElementById("hardOption");

let easyOverlay = document.getElementById("easyOverlay");
let mediumOverlay = document.getElementById("mediumOverlay");
let hardOverlay = document.getElementById("hardOverlay");

chrome.storage.sync.get("theme", ({ theme }) => {
  setToTheme(theme);
});

chrome.storage.sync.get("easy", ({ easy }) => {
  easyOption.checked = easy;
});

chrome.storage.sync.get("medium", ({ medium }) => {
  mediumOption.checked = medium;
});

chrome.storage.sync.get("hard", ({ hard }) => {
  hardOption.checked = hard;
});

themeBtn.addEventListener("click", async () => {
  if (themeBtn.className === "lightBtn") {
    chrome.storage.sync.set({ theme: "light" });
  } else {
    chrome.storage.sync.set({ theme: "dark" });
  }
  setToTheme();
});

applyBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.set({ easy: easyOption.checked });
  chrome.storage.sync.set({ medium: mediumOption.checked });
  chrome.storage.sync.set({ hard: hardOption.checked });

  chrome.tabs.sendMessage(tab.id, { action: "applyFilter" });
});

clearBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  clearCheckboxAndStorage();

  chrome.tabs.sendMessage(tab.id, { action: "clearFilter" });
});

easyOverlay.addEventListener("click", () => {
  easyOption.checked = !easyOption.checked;
  chrome.storage.sync.set({ easy: easyOption.checked });
});

mediumOverlay.addEventListener("click", () => {
  mediumOption.checked = !mediumOption.checked;
  chrome.storage.sync.set({ medium: mediumOption.checked });
});

hardOverlay.addEventListener("click", () => {
  hardOption.checked = !hardOption.checked;
  chrome.storage.sync.set({ hard: hardOption.checked });
});

function clearCheckboxAndStorage() {
  chrome.storage.sync.set({ easy: true });
  chrome.storage.sync.set({ medium: true });
  chrome.storage.sync.set({ hard: true });

  easyOption.checked = true;
  mediumOption.checked = true;
  hardOption.checked = true;
}

function setToTheme() {
  chrome.storage.sync.get("theme", ({ theme }) => {
    switch (theme) {
      case "light":
        themeBtn.className = "darkBtn";
        themeBtn.innerText = "Dark";
        title.style.color = "black";
        document.body.style.backgroundColor = "white";
        break;
      case "dark":
        themeBtn.className = "lightBtn";
        themeBtn.innerText = "Light";
        title.style.color = "white";
        document.body.style.backgroundColor = "#282b2d";
        break;
      default:
        setTheme("light");
    }
  });
}
