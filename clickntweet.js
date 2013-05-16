chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.getSelected(null, function (tab) {
    var url = 'https://twitter.com/intent/tweet?url=' + encodeURI(tab.url) + '&text=' + encodeURIComponent(tab.title) + '&related=tdecs';
    var width = 550;
    var left = (screen.width/2)-(width/2);
    chrome.windows.create({url: url, width: width, height: 290, top: 150, left: left, type: 'panel', focused: true}, function (window) {
      var _tabId = window.tabs[0].id;
      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (tabId === _tabId) {
          if (changeInfo.status === 'complete' && /complete/.test(tab.url)) {
            chrome.windows.remove(window.id);
          }
        }
      });
    });
  });
});
