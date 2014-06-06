var saveListing = function () {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    postToServer(tabs[0].url);
  });
};

var postToServer = function (url) {

    chrome.storage.local.get('groupId', function (groupId) {
      var postURL = 'http://localhost:8080/api/group/' + groupId.groupId + '/listings';

      var xhr = new XMLHttpRequest(); 
      xhr.open('POST', postURL, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      xhr.onreadystatechange = function () {
        // If the request completed
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // console.log(xhr);
            } else {
                console.log('Error saving ');
            }
        }
      };

        var params  =   'url=' + url;
        // params = params.replace(/%20/g, '+');
        xhr.send(params);
    });
};



chrome.browserAction.onClicked.addListener(saveListing);
