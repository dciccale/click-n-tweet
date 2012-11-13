chrome.tabs.getSelected(null, function (tab) {
  var url = 'https://twitter.com/intent/tweet?url=' + encodeURI(tab.url) + '&text=' + encodeURIComponent(tab.title);
  chrome.windows.create({ url: url, width: 550, height: 295, type: 'panel', focused: true });
});