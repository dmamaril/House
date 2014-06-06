var getUserData = function (googleId) {
  var url = 'http://127.0.0.1:8080/api/user/' + googleId;
  console.log(url);

  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var parseResult = JSON.parse(xhr.responseText);
          var group = parseResult['groups'][0]['_id'];
          console.log(group);
        } else {
            console.log('Server communication error.');
        }
    }
  };
  xhr.send();
}