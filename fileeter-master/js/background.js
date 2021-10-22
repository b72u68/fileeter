chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.sync.set({
    filter: { easy: true, medium: true, hard: true, tags: "" },
  });

  chrome.storage.sync.get("theme", ({ theme }) => {
    if (!theme) {
      chrome.storage.sync.set({ theme: "light" });
    }
  });
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  chrome.action.disable(tab.id);

  const urlPattern = /^(https|http):\/\/leetcode.com\/(company|tag)\/.*/g;

  if (tab.url && tab.url.match(urlPattern)) {
    chrome.action.enable(tab.id);
  }
});
