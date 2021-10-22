chrome.runtime.onMessage.addListener(function (request, sender, _) {
  toggleProblemTags(true);

  switch (request.action) {
    case "applyFilter":
      applyFilter();
      break;
    case "clearFilter":
      clearFilter();
      break;
    default:
      throw `Unknown action message from ${sender}.`;
  }
});

function applyFilter() {
  const problemElements = document.querySelectorAll("tr");

  chrome.storage.sync.get("filter", ({ filter }) => {
    const { easy, medium, hard, tags } = filter;

    for (let problemElement of problemElements) {
      let problemElementText = problemElement.innerText;

      if (problemElementText.indexOf("Easy") !== -1) {
        if (easy && problemElementText.indexOf(tags) !== -1) {
          problemElement.hidden = false;
        } else {
          problemElement.hidden = true;
        }
      }

      if (problemElementText.indexOf("Medium") !== -1) {
        if (medium && problemElementText.indexOf(tags) !== -1) {
          problemElement.hidden = false;
        } else {
          problemElement.hidden = true;
        }
      }

      if (problemElementText.indexOf("Hard") !== -1) {
        if (hard && problemElementText.indexOf(tags) !== -1) {
          problemElement.hidden = false;
        } else {
          problemElement.hidden = true;
        }
      }
    }
  });
}

function clearFilter() {
  let problemElements = document.querySelectorAll("tr");

  for (let problemElement of problemElements) {
    problemElement.hidden = false;
  }
}

function toggleProblemTags(status) {
  let labelElements = document.querySelectorAll("label");
  for (let labelElement of labelElements) {
    if (labelElement.innerText.indexOf("Show problem tags") !== -1) {
      let showTagsCheckbox = labelElement.querySelectorAll("input")[0];
      if (
        showTagsCheckbox.value === !status ||
        showTagsCheckbox.value === `${!status}`
      ) {
        showTagsCheckbox.click();
      }
      break;
    }
  }
}
