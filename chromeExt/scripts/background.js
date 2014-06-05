var saveListing = function () {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url, email);
    parseUrl(tabs[0].url);
  });
};

var parseUrl = function (uri) {
  xhr.open('GET', uri, true);

  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    // If the request completed
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (uri.indexOf('craigslist') !== -1 && uri.indexOf('.html') !== -1) { 
              postToServer(parser.craigslist(xhr.response, uri));
            } else if (uri.indexOf('airbnb') !== -1 && uri.indexOf('/rooms/') !== -1) {
              postToServer(parser.airbnb(xhr.response, uri));
            } else {
              console.log('NOT A VALID URI !!!!!!!!');
            }
        } else {
            console.log('Error!!!!!!!!!!!!!!!');
        }
    }
  };

  // xhr.send(params);
  xhr.send();
  console.log('Saving...');
};

var postToServer = function (uri) {

  var postURL = 'http://localhost:8080/api/listings';

  // setup ajax POST request
  xhr.open('POST', postURL, true);

  var url = encodeURIComponent(uri);

  var params = 'uri=' + url + '&userEmail=' + email;

  // Set correct header for form data 
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    // If the request completed
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // If it was a success, close the popup after a short delay
            console.log('Success on save');
        } else {
            // Show what went wrong
            console.log('Error saving: ' + xhr.statusText);
        }
    }
  };

  // xhr.send(params);
  xhr.send(params);
  console.log('Saving...');
};



chrome.browserAction.onClicked.addListener(saveListing);