chrome.runtime.onMessage.addListener(function (request, _, _) {
  let problemElements = document.querySelectorAll("tr");
  if (request.action === "applyFilter") {
    for (let problemElement of problemElements) {
      if (problemElement.innerText.indexOf("Easy") !== -1) {
        chrome.storage.sync.get("easy", ({ easy }) => {
          if (!easy) {
            problemElement.hidden = true;
          } else {
            problemElement.hidden = false;
          }
        });
      }
      if (problemElement.innerText.indexOf("Medium") !== -1) {
        chrome.storage.sync.get("medium", ({ medium }) => {
          if (!medium) {
            problemElement.hidden = true;
          } else {
            problemElement.hidden = false;
          }
        });
      }
      if (problemElement.innerText.indexOf("Hard") !== -1) {
        chrome.storage.sync.get("hard", ({ hard }) => {
          if (!hard) {
            problemElement.hidden = true;
          } else {
            problemElement.hidden = false;
          }
        });
      }
    }
  } else if (request.action === "clearFilter") {
    for (let problemElement of problemElements) {
      problemElement.hidden = false;
    }
  }
});
