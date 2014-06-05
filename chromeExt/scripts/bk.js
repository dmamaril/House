'use strict';
chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

var visitedURL = '';
var xhr = new XMLHttpRequest();
var authorizedURL = 'http://127.0.0.1:8080/groups';


var postToServer = function (uri) {

  var postURL = 'http://localhost:8080/api/listings';

  // setup ajax POST request
  xhr.open('POST', postURL, true);

  var url = encodeURIComponent(uri);

  var params = 'uri=' + url;

  // Set correct header for form data 
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    // If the request completed
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // If it was a success, close the popup after a short delay
            console.log('Saved.')
        } else {
            // Show what went wrong
            console.log('Error saving: ' + xhr.statusText);
        }
    }
  };

  xhr.send(params);
  console.log('Saving...');
};


var sendURL = function (tab) {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    postToServer(tabs[0].url);
  });
};

var authorizeUser = function () {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      visitedURL = tabs[0].url;
      chrome.tabs.update(tabs[0].id, { url : 'http://127.0.0.1:8080/auth/google' }, function (a,b){
        console.log('a', a);
        console.log('b', b);
      });
  });
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading' && tab.url === authorizedURL && visitedURL !== authorizedURL) {
    chrome.tabs.update(tabId, { url: visitedURL }, function (tab) {
      postToServer(tab.url);
    });
  }
});

chrome.browserAction.onClicked.addListener(authorizeUser);