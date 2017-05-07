var accessToken;

// Send User to Login Page and Request the Permission to use the user's data
function login(){
  const loginURL = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id="+clientId+"&redirect_uri="+uri+"&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight";
  const win = window.open(loginURL, "Login To Fitbit", 'width=800, height=600'); 
  var pollTimer   =   window.setInterval(function() { 
    try {
      if (win.document.URL.indexOf(reditrectURL) != -1) {
        window.clearInterval(pollTimer);
        var url =  win.document.URL;
        var code = gup(url,"code");
        win.close();
        validateToken(uri, code);
      }
    } catch(e) {
    }
  }, 100);
}


function getRequest(getUrl, getHeaders, getBody){
  var authHeaders = {"Authorization": "Bearer "+accessToken};
  var assignedHeaders = Object.assign(authHeaders, getHeaders);
  let accessHeaders = new Headers(assignedHeaders);
  let accessInit = {
    method: 'GET',
    headers: accessHeaders,
    mode: 'cors',
    cache: 'default',
  }
  let accessRequest = new Request(getUrl, accessInit);
  return accessRequest;
}

// Request validation from Fitbit
function validateToken(redirectURI, code){
  const validateURL = "https://api.fitbit.com/oauth2/token"
  const validateHeaders = new Headers({
    "Authorization": "Basic "+window.btoa(clientId+":"+clientSecret),
    "Content-Type": "application/x-www-form-urlencoded",

  });
  const validateInit = {
    method: 'POST',
    headers: validateHeaders,
    mode: 'cors',
    cache: 'default',
    body:"client_id="+clientId+"&grant_type=authorization_code&redirect_uri=" + redirectURI + "&code=" + code
  }
  const validateRequest = new Request(validateURL, validateInit);

  fetch(validateRequest).then(function(data) {
    return data.text();
  }).then(function(data) {
    var obj = JSON.parse(data);
    accessToken = obj.access_token;
  });

}


// HELPER FUNCTIONS

//credits: http://www.netlobo.com/url_query_string_javascript.html
// Get parameter from the URL
function gup(url, name) {
  name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
  var regexS = "[\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  if( results == null )
    return "";
  else
    return results[1];
}

function formatDate(date) {
  var d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
