chrome.runtime.onInstalled.addListener(() => {
  // Page actions are disabled by default and enabled on selected tabs
  chrome.action.disable();

  chrome.storage.sync.set({
    filter: {
      easy: true,
      medium: true,
      hard: true,
      tags: [],
    },
  });

  chrome.storage.sync.get("theme", ({ theme }) => {
    if (!theme) {
      chrome.storage.sync.set({ theme: "light" });
    }
  });

  // Only enable on tabs with selected url
  chrome.tabs.onActivated.addListener(async (info) => {
    const tab = await chrome.tabs.get(info.tabId);
    const urlPattern = /^(https|http):\/\/leetcode.com\/(company|tag)\/.*/g;
    tab.url && tab.url.match(urlPattern)
      ? chrome.action.enable(tab.id)
      : chrome.action.disable(tab.id);
  });
});
