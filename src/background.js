let easy = true;
let medium = true;
let hard = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ easy });
  chrome.storage.sync.set({ medium });
  chrome.storage.sync.set({ hard });
  console.log(
    `The default filter is set to easy=${easy}, medium=${medium}, hard=${hard}`
  );
});
