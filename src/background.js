chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.sync.set({ easy: true });
  chrome.storage.sync.set({ medium: true });
  chrome.storage.sync.set({ hard: true });

  chrome.storage.sync.get("theme", ({ theme }) => {
    if (!theme) {
      chrome.storage.sync.set({ theme: "light" });
    }
  });
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  const urlPattern = /(https|http):\/\/leetcode.com\/company\/.*/g;

  if (tab.url && tab.url.match(urlPattern)) {
    chrome.action.enable(tab.id);
  } else {
    chrome.action.disable(tab.id);
  }
});
