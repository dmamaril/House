var getUserData = function (googleId) {
  var url = 'http://127.0.0.1:8080/api/user/' + googleId;

  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var parseResult = JSON.parse(xhr.responseText);
          var groupId = parseResult['groups'][0]['_id'];
          chrome.storage.local.set({ 'groupId' : groupId });
        } else {
            console.log('Server communication error.');
        }
    }
  };
  xhr.send();
}