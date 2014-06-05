var googleAuth = new OAuth2('google', {
  client_id: '379308843128-61jgp9sco3006630h1pspsj4ino0snor.apps.googleusercontent.com',
  client_secret: 'uMLlqwQ93xmvl0l3JC7jzl6z',
  api_scope: 'https://www.googleapis.com/auth/userinfo.email'
});

var email; 
var xhr = new XMLHttpRequest(); 

googleAuth.authorize(function() {

  // We should now have googleAuth.getAccessToken() returning a valid token value for us 
  // Create an XMLHttpRequest to get the email address 
  xhr.onreadystatechange = function() { 
    if( xhr.readyState == 4 ) {
      if( xhr.status == 200 ) { 
        var parseResult = JSON.parse(xhr.responseText);
        // The email address is located naw: 
        email = parseResult["email"];
      }
    }
  }
  // Open it up as GET, POST didn't work for me for the userinfo 
  xhr.open("GET","https://www.googleapis.com/oauth2/v1/userinfo",true);
  // Set the content & autherization 
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', "OAuth " + googleAuth.getAccessToken() );
  xhr.send(null);
  // Debugging stuff so we can see everything in the xhr.  Do not leave this in production code 
  console.log(xhr);
});

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
          if (xhr.response.indexOf('craigslist') > -1) { 
              postToServer(parser.craigslist(xhr.response, uri));
            } else if (xhr.response.indexOf('airbnb') > -1) {
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