chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ easy: true });
  chrome.storage.sync.set({ medium: true });
  chrome.storage.sync.set({ hard: true });
  chrome.storage.sync.set({ theme: "light" });
});
