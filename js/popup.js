const tagsList = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Depth-First Search",
  "Sorting",
  "Greedy",
  "Breadth-First Search",
  "Database",
  "Tree",
  "Binary Search",
  "Binary Tree",
  "Matrix",
  "Two Pointers",
  "Bit Manipulation",
  "Stack",
  "Design",
  "Heap (Priority Queue)",
  "Backtracking",
  "Graph",
  "Simulation",
  "Prefix Sum",
  "Sliding Window",
  "Linked List",
  "Counting",
  "Union Find",
  "Recursion",
  "Binary Search Tree",
  "Trie",
  "Monotonic Stack",
  "Ordered Set",
  "Divide and Conquer",
  "Bitmask",
  "Queue",
  "Memoization",
  "Geometry",
  "Game Theory",
  "Enumeration",
  "Hash Function",
  "Segment Tree",
  "Topological Sort",
  "Interactive",
  "Binary Indexed Tree",
  "String Matching",
  "Data Stream",
  "Rolling Hash",
  "Shortest Path",
  "Randomized",
  "Combinatorics",
  "Iterator",
  "Concurrency",
  "Monotonic Queue",
  "Number Theory",
  "Merge Sort",
  "Brainteaser",
  "Probability and Statistics",
  "Doubly-Linked List",
  "Quickselect",
  "Bucket Sort",
  "Minimum Spanning Tree",
  "Counting Sort",
  "Suffix Array",
  "Shell",
  "Line Sweep",
  "Reservoir Sampling",
  "Strongly Connected Component",
  "Eulerian Circuit",
  "Radix Sort",
  "Rejection Sampling",
  "Biconnected Component",
];

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

let tagsInput = document.getElementById("tagsInput");

window.onload = function () {
  let tagOptionsHTML = '<option value=""></option>';
  for (let i = 0; i < tagsList.length; i++) {
    tagOptionsHTML += `<option value="${tagsList[i]}">${tagsList[i]}</option>`;
  }
  tagsInput.innerHTML = tagOptionsHTML;
};

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

chrome.storage.sync.get("tags", ({ tags }) => {
  tagsInput.value = tags;
});

themeBtn.addEventListener("click", async () => {
  if (themeBtn.className === "light") {
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
  chrome.storage.sync.set({ tags: tagsInput.value });

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
        themeBtn.className = "dark";
        themeBtn.innerText = "Dark";
        document.body.className = "light";
        break;
      case "dark":
        themeBtn.className = "light";
        themeBtn.innerText = "Light";
        document.body.className = "dark";
        break;
      default:
        setTheme("light");
        break;
    }
  });
}
