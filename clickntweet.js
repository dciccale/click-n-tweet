/*!
 * Click n' Tweet v1.4.6
 * https://chrome.google.com/webstore/detail/click-n-tweet/gdepkkciedfadghaigjanfkcdedenpbh
 * Copyright (c) 2013 Denis Ciccale (@tdecs)
 * Released under the MIT license
 * https://github.com/dciccale/click-n-tweet/blob/master/LICENSE.txt
 */
chrome.browserAction.onClicked.addListener(function (tab) {
  var twitterUrl = 'https://twitter.com/intent/tweet?related=tdecs';
  var url = twitterUrl + '&url=' + encodeURI(tab.url) + '&text=' + encodeURIComponent(tab.title);
  var width = 550;
  var left = (screen.width/2)-(width/2);
  chrome.windows.create({url: url, width: width, height: 270, top: 150, left: left, type: 'panel', focused: true}, function (window) {
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
