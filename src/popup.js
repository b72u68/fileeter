let applyBtn = document.getElementById("applyBtn");
let clearBtn = document.getElementById("clearBtn");

let easyOption = document.getElementById("easyOption");
let mediumOption = document.getElementById("mediumOption");
let hardOption = document.getElementById("hardOption");

chrome.storage.sync.get("easy", ({ easy }) => {
  easyOption.checked = easy;
});

chrome.storage.sync.get("medium", ({ medium }) => {
  mediumOption.checked = medium;
});

chrome.storage.sync.get("hard", ({ hard }) => {
  hardOption.checked = hard;
});

applyBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!easyOption.checked && !mediumOption.checked && !hardOption.checked) {
    clearCheckboxAndStorage();
  } else {
    chrome.storage.sync.set({ easy: easyOption.checked });
    chrome.storage.sync.set({ medium: mediumOption.checked });
    chrome.storage.sync.set({ hard: hardOption.checked });
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: applyFilters,
  });
});

clearBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  clearCheckboxAndStorage();

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: clearFilters,
  });
});

function applyFilters() {
  const problemElements = document.querySelectorAll("tr");
  for (let problemElement of problemElements) {
    if (problemElement.innerText.indexOf("Easy") !== -1) {
      chrome.storage.sync.get("easy", ({ easy }) => {
        if (!easy) {
          problemElement.hidden = true;
        } else {
          problemElement.hidden = false;
        }
      });
    }
    if (problemElement.innerText.indexOf("Medium") !== -1) {
      chrome.storage.sync.get("medium", ({ medium }) => {
        if (!medium) {
          problemElement.hidden = true;
        } else {
          problemElement.hidden = false;
        }
      });
    }
    if (problemElement.innerText.indexOf("Hard") !== -1) {
      chrome.storage.sync.get("hard", ({ hard }) => {
        if (!hard) {
          problemElement.hidden = true;
        } else {
          problemElement.hidden = false;
        }
      });
    }
  }
}

function clearFilters() {
  const problemElements = document.querySelectorAll("tr");
  for (let problemElement of problemElements) {
    problemElement.hidden = false;
  }
}

function clearCheckboxAndStorage() {
  chrome.storage.sync.set({ easy: true });
  chrome.storage.sync.set({ medium: true });
  chrome.storage.sync.set({ hard: true });

  easyOption.checked = true;
  mediumOption.checked = true;
  hardOption.checked = true;
}
