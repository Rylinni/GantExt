
'use strict';

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

    chrome.storage.local.get("logged_in", function (data) {
        if (data.logged_in)
              window.location.href="popup.html";
    });

});

//
// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
//
// });

let signup = document.getElementById('signup');
signup.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // chrome.tabs.executeScript(
    //     tabs[0].id,
    //     {code: 'document.body.style.backgroundColor = "' + color + '";'});

    var newURL = "https://gantgateway.com/login";
    chrome.tabs.create({ url: newURL });
  });
}

let loginb = document.getElementById('login');

//send messages to background
loginb.onclick = function(element) {
    console.log(document.getElementById("username").value)
    // let username = document.getElementById('usrnm').value;
    // let form = new FormData(document.querySelector('body > div > article > form'));
    // console.log(form);

    chrome.runtime.sendMessage({
            submit: true,
            usrnm: document.getElementById("username").value,
            psw : document.getElementById("psw").value },
        function(response) {
        console.log(response.farewell);
        chrome.storage.sync.get('stat', function(data) {
            console.log(data.stat)
        });
    });



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      console.log(sender.tab ?
          "from a content script:" + sender.tab.url :
          "from the extension");

      if (request.login == true){
          window.location.href="popup.html";
      }
      if (request.login == false){
          document.getElementById("username").value = "";
          document.getElementById("psw").value = "";
          // document.getElementById("body").innerHTML+="<p class=\"text-danger\">Incorrect username or password</p>"
      }
  });


// chrome.runtime.sendMessage(
//     {contentScriptQuery: "queryPrice", itemId: 12345},
//     price => ...);


    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", 'https://pokeapi.co/api/v2/pokemon/ditto/', true);
    // xhr.onreadystatechange = function() {
    //   if (xhr.readyState == 4) {
    //     // innerText does not let the attacker inject HTML elements.
    //     document.getElementById("resp").innerText = xhr.responseText;
    //   }
    // }
    // xhr.send();




    // // Create the new request
    // var xhr = new XMLHttpRequest();
    //
    // // Set the URL
    // var url = 'https://gantgateway.com/oauth/token';
    //
    // // Populate the form data
    // var data = new FormData();
    // data.append('grant_type', 'password');
    // data.append('client_id', '2');
    // data.append('client_secret', 'd7pXysHr1RsHmphyyt8q5bc258XUh4CXevgZX4Sp');
    // data.append('scope', '*');
    // data.append('username', 'jonathan.kelp@ganttravel.com');
    // data.append('password', 'xxxxxxxxxx');
    //
    // // Set the method and URL
    // xhr.open('GET', url, true);
    //
    // console.log("test");
    //
    // // Specify that we should log the response to the console
    // xhr.onload = function () {
    //     console.log(this.responseText);
    // };
    //
    // // Send the request
    // xhr.send(data);

}

