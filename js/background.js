chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    filter: { easy: true, medium: true, hard: true, tags: "" },
  });

  chrome.storage.sync.get("theme", ({ theme }) => {
    if (!theme) {
      chrome.storage.sync.set({ theme: "light" });
    }
  });

  chrome.tabs.onActivated.addListener(async (info) => {
    const tab = await chrome.tabs.get(info.tabId);

    const urlPattern = /^(https|http):\/\/leetcode.com\/(company|tag)\/.*/g;
    tab.url && tab.url.match(urlPattern)
      ? chrome.action.enable(tab.tabId)
      : chrome.action.disable(tab.tabId);
  });
});
