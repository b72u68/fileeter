chrome.runtime.onInstalled.addListener(() => {
  // Page actions are disabled by default and enabled on selected tabs
  chrome.action.disable();

  chrome.storage.sync.set({
    filter: {
      easy: true,
      medium: true,
      hard: true,
      difficulties: [],
      tags: [],
    },
  });

  chrome.storage.sync.get("theme", ({ theme }) => {
    if (!theme) {
      chrome.storage.sync.set({ theme: "light" });
    }
  });

  // Clear all rules to ensure only our expected rules are set
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Declare a rule to enable the action on example.com pages
    let leetcodeTagPage = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            urlPrefix: "leetcode.com/tag",
            schemes: ["https", "http"],
          },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };

    let leetcodeCompanyPage = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            urlPrefix: "leetcode.com/company",
            schemes: ["https", "http"],
          },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };

    // Finally, apply our new array of rules
    let rules = [leetcodeTagPage, leetcodeCompanyPage];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });

  // Activate on tabs with selected url
  chrome.tabs.onActivated.addListener(async (info) => {
    const tab = await chrome.tabs.get(info.tabId);
    const urlPattern = /^(https|http):\/\/leetcode.com\/(company|tag)\/.*/g;
    tab.url && tab.url.match(urlPattern)
      ? chrome.action.enable()
      : chrome.action.disable();
  });
});
