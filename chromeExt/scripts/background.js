var saveListing = function () {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    parseUrl(tabs[0].url);
  });
};

var parseUrl = function (uri) {
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', uri, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (uri.indexOf('craigslist') !== -1 && uri.indexOf('.html') !== -1) { 
              postToServer(parser.craigslist(xhr.response, uri));
            } else if (uri.indexOf('airbnb') !== -1 && uri.indexOf('/rooms/') !== -1) {
              postToServer(parser.airbnb(xhr.response, uri));
            } else {
              console.log('Not a valid uri.');
            }
        } else {
            console.log('Server communication error.');
        }
    }
  };
  xhr.send();
};

var postToServer = function (listingData) {
    var postURL = 'http://localhost:8080/api/group/1234/listings';

    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', postURL, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
      // If the request completed
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(xhr);
          } else {
              console.log('Error saving ');
          }
      }
    };

    chrome.storage.local.get('notImportantInfoPlsStayAway', function (storage) {

      var params  =   'chromeData=' + JSON.stringify(listingData) + 
                      '&googleId=' + storage.notImportantInfoPlsStayAway;

      // params = params.replace(/%20/g, '+');
      xhr.send(params);
    });
};



chrome.browserAction.onClicked.addListener(saveListing);
