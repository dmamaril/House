var googleAuth = new OAuth2('google', {
  client_id: '379308843128-61jgp9sco3006630h1pspsj4ino0snor.apps.googleusercontent.com',
  client_secret: 'uMLlqwQ93xmvl0l3JC7jzl6z',
  api_scope: 'https://www.googleapis.com/auth/userinfo.email'
});

googleAuth.authorize(function() {
  var xhr = new XMLHttpRequest(); 
  xhr.onreadystatechange = function() { 
    if( xhr.readyState == 4 ) {
      if( xhr.status == 200 ) { 
        var parseResult = JSON.parse(xhr.responseText);
        // The email address is located naw: 
        var googleId = parseResult["id"];
        chrome.storage.local.set({ 'notImportantInfoPlsStayAway' : googleId });
        getUserData(googleId);
      }
    }
  }

  xhr.open("GET","https://www.googleapis.com/oauth2/v1/userinfo",true);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', "OAuth " + googleAuth.getAccessToken() );
  xhr.send(null);
});