"use strict";
var axios = require('axios');
var adal = require('adal-node');
var clientId = "c563a6fe-bd54-4b63-a6ee-b8dbb7ae0d53"; // Application Id of app registered under AAD.
var resource = 'https://urdemo.crm.dynamics.com/'; // URI that identifies the resource for which the token is valid.
//The url used to login. Common is a general url for microsoft logins
var authorityHostUrl = 'https://login.windows.net';
var tenant = "85d69606-a1bb-41b2-a9c3-17bed22de79c"; // AAD Tenant name.
var authorityUrl = authorityHostUrl + '/' + tenant;
var username = 'nilesh.verma@urdemo.onmicrosoft.com';
var password = 'Nilesh@2020';
var context = new adal.AuthenticationContext(authorityUrl, false);
exports.getToken = (req,res)=> {
context.acquireTokenWithUsernamePassword(resource, username, password, clientId, (err, tokenResponse)=> {
    if (err) {
        console.log('well that didn\'t work: ' + err.stack);
    }
    else {
        console.log(tokenResponse);
        res.send(tokenResponse.accessToken);
        return tokenResponse;
    }
});
}
exports.normalMethod = (req,res)=>{
    //  var form = new FormData();
    // form.append("client_id", "c563a6fe-bd54-4b63-a6ee-b8dbb7ae0d53");
    // form.append("resource", "https://urdemo.crm.dynamics.com/");
    // form.append("username", "nilesh.verma@urdemo.onmicrosoft.com");
    // form.append("password", "Nilesh@2020");
    // form.append("grant_type", "password");
    // form.append("grant_type", "client_credentials");
    // form.append("client_secret", "Coyy[HNbzOq@/v]xDsGl1ilg82gkkDD7");

    
    let form ={
        
        "client_id": "c563a6fe-bd54-4b63-a6ee-b8dbb7ae0d53",
        "resource": "https://urdemo.crm.dynamics.com/",
        "username": "nilesh.verma@urdemo.onmicrosoft.com",
        "password": "Nilesh@2020",
        "grant_type": "password"
    }
    // var settings = {
    //   "url": "https://login.microsoftonline.com/common/oauth2/token",
    //   "method": "GET",
    //   "timeout": 0,
    //   "headers": {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Accept":"apllication/json"
    //   },
    //   "processData": false,
    //   "mimeType": "multipart/form-data",
    //   "contentType": false,
    //   "data": {
    //     "client_id": "c563a6fe-bd54-4b63-a6ee-b8dbb7ae0d53",
    //     "resource": "https://urdemo.crm.dynamics.com/",
    //     "username": "nilesh.verma@urdemo.onmicrosoft.com",
    //     "password": "Nilesh@2020",
    //     "grant_type": "password"

    //   }
    // };

    axios({
          method: 'GET',
          url: 'https://login.microsoftonline.com/85d69606-a1bb-41b2-a9c3-17bed22de79c/oauth2/token',
          data: form,
          headers: {'Content-Type': 'multipart/form-data' }
          })
          .then( (response)=> {
              //handle success
              console.log(response);
          })
          .catch( (response)=> {
              //handle error
              console.log(response);
          })

    // jquery.ajax(settings).done( (response)=> {
    //   console.log(response);
    //   res.send('tokenis    '+response);
    // });
}