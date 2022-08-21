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
    const { difficulties, tags } = filter;
    for (let problemElement of problemElements) {
      const problemElementText = problemElement.innerText;
      let isProblemMatchCriteria = false;
      for (let difficulty of difficulties) {
        if (problemElementText.indexOf(difficulty) !== -1) {
          if (tags.length === 0) {
            isProblemMatchCriteria = true;
            break;
          }
          for (let tag of tags) {
            if (problemElementText.indexOf(tag) !== -1) {
              isProblemMatchCriteria = true;
              break;
            }
          }
        }
      }
      problemElement.hidden = !isProblemMatchCriteria;
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
