// Current available tags
const tagList = [
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

// Front-end elements
const applyBtn = document.getElementById("applyBtn");
const clearBtn = document.getElementById("clearBtn");
const themeBtn = document.getElementById("themeBtn");

const easyOption = document.getElementById("easyOption");
const mediumOption = document.getElementById("mediumOption");
const hardOption = document.getElementById("hardOption");

const easyOverlay = document.getElementById("easyOverlay");
const mediumOverlay = document.getElementById("mediumOverlay");
const hardOverlay = document.getElementById("hardOverlay");

const tagsInput = document.getElementById("tagsInput");
const selectedTags = document.getElementById("selectedTags");

// Supporting functions
function initializeTagOptions() {
  const firstTagOptionElement = document.createElement("option");
  firstTagOptionElement.value = "";
  tagsInput.appendChild(firstTagOptionElement);
  for (let i = 0; i < tagList.length; i++) {
    const tagOptionElement = document.createElement("option");
    tagOptionElement.value = tagList[i];
    tagOptionElement.innerText = tagList[i];
    tagsInput.appendChild(tagOptionElement);
  }
}

function onClickSelectedTagElement(event) {
  chrome.storage.sync.get("filter", ({ filter }) => {
    const { easy, medium, hard, tags } = filter;
    const newTags = tags.filter((elem) => elem !== event.target.value);
    chrome.storage.sync.set({
      filter: {
        easy,
        medium,
        hard,
        tags: newTags,
      },
    });
    populateSelectedTags(newTags);
  });
}

function getSelectedTagHTMLElement(tag) {
  const selectedTagElement = document.createElement("button");
  selectedTagElement.className = "selectedTag";
  selectedTagElement.id = tag;
  selectedTagElement.value = tag;
  selectedTagElement.innerText = tag;
  selectedTagElement.addEventListener("click", onClickSelectedTagElement);
  return selectedTagElement;
}

function populateSelectedTags(tags) {
  selectedTags.innerHTML = "";
  for (let tag of tags) {
    selectedTags.appendChild(getSelectedTagHTMLElement(tag));
  }
}

function finalizeFilter() {
  chrome.storage.sync.get("filter", ({ filter }) => {
    const { easy, medium, hard, tags } = filter;
    const difficulties = [];
    if (easy) {
      difficulties.push("Easy");
    }
    if (medium) {
      difficulties.push("Medium");
    }
    if (hard) {
      difficulties.push("Hard");
    }
    console.log(difficulties, tags);
    chrome.storage.sync.set({
      filter: { easy, medium, hard, difficulties, tags },
    });
  });
}

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

function clearFilter() {
  setChromeFilterData({
    easy: true,
    medium: true,
    hard: true,
    tags: [],
  });

  easyOption.checked = true;
  mediumOption.checked = true;
  hardOption.checked = true;
  tagsInput.value = "";
  selectedTags.innerHTML = "";
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

// Initial setup for popup
window.onload = function () {
  chrome.storage.sync.get("theme", ({ theme }) => {
    setTheme(theme);
  });

  chrome.storage.sync.get("filter", ({ filter }) => {
    const { easy, medium, hard, tags } = filter;
    easyOption.checked = easy;
    mediumOption.checked = medium;
    hardOption.checked = hard;
    tagsInput.value = "";
    populateSelectedTags(tags);
  });

  initializeTagOptions();
};

// Listeners
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
  finalizeFilter();
  chrome.tabs.sendMessage(tab.id, { action: "applyFilter" });
});

clearBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  clearFilter();
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

tagsInput.addEventListener("change", () => {
  chrome.storage.sync.get("filter", ({ filter }) => {
    const { easy, medium, hard, tags } = filter;
    if (tagsInput.value && tags.indexOf(tagsInput.value) === -1) {
      tags.push(tagsInput.value);
    }
    chrome.storage.sync.set({ filter: { easy, medium, hard, tags } });
    tagsInput.value = "";
    populateSelectedTags(tags);
  });
});
