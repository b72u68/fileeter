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
  chrome.storage.sync.get("theme", ({ theme }) => {
    setTheme(theme);
  });

  chrome.storage.sync.get("filter", ({ filter }) => {
    const { easy, medium, hard, tags } = filter;
    easyOption.checked = easy;
    mediumOption.checked = medium;
    hardOption.checked = hard;
    tagsInput.value = tags;
  });

  let tagOptionsHTML = '<option value=""></option>';

  for (let i = 0; i < tagsList.length; i++) {
    tagOptionsHTML += `<option value="${tagsList[i]}">${tagsList[i]}</option>`;
  }
  tagsInput.innerHTML = tagOptionsHTML;
};

themeBtn.addEventListener("click", () => {
  if (themeBtn.className === "light") {
    chrome.storage.sync.set({ theme: "light" });
  } else {
    chrome.storage.sync.set({ theme: "dark" });
  }
  toggleTheme();
});

applyBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const filterData = {
    easy: easyOption.checked,
    medium: mediumOption.checked,
    hard: hardOption.checked,
    tags: tagsInput.value,
  };
  setChromeFilterData(filterData);
  chrome.tabs.sendMessage(tab.id, { action: "applyFilter" });
});

clearBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  clearCheckboxAndStorage();

  chrome.tabs.sendMessage(tab.id, { action: "clearFilter" });
});

easyOverlay.addEventListener("click", () => {
  easyOption.checked = !easyOption.checked;
  setChromeFilterData({ easy: easyOption.checked });
});

mediumOverlay.addEventListener("click", () => {
  mediumOption.checked = !mediumOption.checked;
  setChromeFilterData({ medium: mediumOption.checked });
});

hardOverlay.addEventListener("click", () => {
  hardOption.checked = !hardOption.checked;
  setChromeFilterData({ hard: hardOption.checked });
});

function setChromeFilterData(filterData) {
  const { easy, medium, hard, tags } = filterData;
  chrome.storage.sync.get("filter", ({ filter }) => {
    chrome.storage.sync.set({
      filter: {
        easy: easy == null ? filter.easy : easy,
        medium: medium == null ? filter.medium : medium,
        hard: hard == null ? filter.hard : hard,
        tags: tags == null ? filter.tags : tags,
      },
    });
  });
}

function clearCheckboxAndStorage() {
  setChromeFilterData({
    easy: true,
    medium: true,
    hard: true,
    tags: "",
  });

  easyOption.checked = true;
  mediumOption.checked = true;
  hardOption.checked = true;
  tagsInput.value = "";
}

function setTheme(theme) {
  switch (theme) {
    case "dark":
      themeBtn.className = "light";
      themeBtn.innerText = "Light";
      document.body.className = "dark";
      break;
    default:
      themeBtn.className = "dark";
      themeBtn.innerText = "Dark";
      document.body.className = "light";
      break;
  }
}

function toggleTheme() {
  chrome.storage.sync.get("theme", ({ theme }) => {
    setTheme(theme);
  });
}
