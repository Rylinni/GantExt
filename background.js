// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// variables
let bgurl = "";
let searchReady = false;
let legslocal = "";
let loadingSearch = false;
let rightpage = false;
let searchFail = false;
let aToken = "";


chrome.runtime.onInstalled.addListener(function() {

    // logged out initialized
    chrome.storage.sync.set({logged_in: false}, function() {
      console.log('Not Logged in');
      login_failure();
  });

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    chrome.storage.sync.set({mainurl: tabs[0].url}, function () {
      console.log('url placed.');
      if (tabs[0].url){
          // gets the background url
          bgurl = tabs[0].url;
          url_Collab();

      }
    });
  });


  // kayak.com conditions
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.kayak.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  // chrome.storage.local.get("logged_in", function(data) {
  //   if(data.logged_in)
  //     chrome.browserAction.setPopup({popup: "popup.html"});
  // });






});



// function change_kayak(){
//     console.log("CHANGEKAYAK");
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             // code: 'document.body.style.backgroundColor = "#4688f1";'
//             // code: 'document.getElementbyId("L_8-").style.backgroundColor = "#4688f1";'
//             // code: 'document.getElementbyClass("resultsContainer").style.backgroundColor = "#4688f1";'
//             {code: 'function addGant() {\n' +
//                 '  if (!(document.getElementById("gantex"))) {\n' +
//                 '    wrappers = document.getElementsByClassName("resultWrapper");\n' +
//                 '    priceTags = document.getElementsByClassName("Flights-Results-FlightPriceSection");\n' +
//                 '    flightNumRegEx = "(?<airline>[A-z]*( [A-z]*)*) (?<flightNum>[0-9]*)";\n' +
//                 '    cityRegEx = "\\\\((?<code>[A-Z]{3})\\\\)";\n' +
//                 '    dateRegEx = "[A-z]{3}, (?<month>[A-z]{3}) (?<day>[0-9]{1,2})";\n' +
//                 '    timeRegEx = "(?<hour>[0-9]{1,2}):(?<min>[0-9]{1,2}) (?<TOD>[a-z]{2})";\n' +
//                 '    function timeChanger(time){\n' +
//                 '      time = time.match(timeRegEx);\n' +
//                 '      if (time.groups.TOD == "am")  {\n' +
//                 '        hour = time.groups.hour\n' +
//                 '        time.groups.min\n' +
//                 '      }\n' +
//                 '      else  {\n' +
//                 '        hour = String(parseInt(time.groups.hour) + 12)\n' +
//                 '      }\n' +
//                 '      return hour + ":" + time.groups.min\n' +
//                 '    }\n' +
//                 '\n' +
//                 '    for (let i = 0; i < wrappers.length; i++) {\n' +
//                 '      var flightIDs = wrappers[i].getElementsByClassName("segment-row");\n' +
//                 '      var GIAURL = "";\n' +
//                 '      for (let j = 0; j < flightIDs.length; j++)  {\n' +
//                 '        date = flightIDs[j].getElementsByClassName("leg-dates-set")[0].innerText.match(dateRegEx);\n' +
//                 '        times = flightIDs[j].getElementsByClassName("time");\n' +
//                 '        cities = flightIDs[j].getElementsByClassName("city");\n' +
//                 '        let flightnum = flightIDs[j].getElementsByClassName("planeDetails details-subheading")[0].innerText.match(flightNumRegEx);\n' +
//                 '        airline = flightnum.groups.airline;\n' +
//                 '        switch (airline)  {\n' +
//                 '          case "Delta":\n' +
//                 '            airline = "DL";\n' +
//                 '            break;\n' +
//                 '          case "American Airlines":\n' +
//                 '            airline = "AA";\n' +
//                 '            break;\n' +
//                 '          case "United Airlines":\n' +
//                 '            airline = "UA";\n' +
//                 '            break;\n' +
//                 '          default:\n' +
//                 '            airline = airline;\n' +
//                 '        }\n' +
//                 '        GIAURL += "\\t<input type=\\"hidden\\" name=\\"segments[]\\"  value=\\"" + cities[0].innerText.match(cityRegEx).groups.code + "|" +\n' +
//                 '            cities[1].innerText.match(cityRegEx).groups.code + "|" + airline + "|" + flightnum.groups.flightNum +\n' +
//                 '            "|" + date.groups.month + " " + date.groups.day + "|" + timeChanger(times[0].innerText) +"|"+ timeChanger(times[1].innerText) + "\\"/>\\n" ;\n' +
//                 '\n' +
//                 '      }\n' +
//                 '      console.log(GIAURL);\n' +
//                 '      img = document.createElement("div")\n' +
//                 '      img.id = "gantex";\n' +
//                 '      img.innerHTML =\n' +
//                 '\n' +
//                 '          "<form method=\\"post\\" action=\\"https://www.gantgateway.com/extension-booking\\"; target=\\"_blank\\">\\n" +\n' +
//                 '          "\\t<input type=\\"hidden\\" name=\\"source\\" value=\\"kayak\\"/>\\n" +\n' +
//                 '          GIAURL +\n' +
//                 '          "\\t<input type=\\"hidden\\" name=\\"access_token\\" value=\\" ' + aToken + '\\"/>\\n" +\n' +
//                 '          "\\t<input style=\\"  padding: 0 2.4em; background:linear-gradient(135deg,#fb0704 0%,#a80503 100%)!important\\"\' " +\n' +
//                 '          "role = \\"button\\" class=\\"Common-Widgets-Button-ButtonDeprecated Common-Widgets-Button-Button Button-Gradient ui-button size-m bookingButton \\" type=\\"submit\\" name=\\"submit\\" value=\\"Gant Travel\\"/>\\n" +\n' +
//                 '          "</form>"\n' +
//                 '      wrappers[i].getElementsByClassName("Flights-Results-FlightPriceSection")[0].append(img);\n' +
//                 '    }\n' +
//                 '  }\n' +
//                 '  setTimeout(function(){ addGant(); }, 3000)\n' +
//                 '}\n' +
//                 'addGant();'}
//         );
//     });
// }

//communicates with kayak page
function contentUpdate()    {
    chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {
        identificador: aToken
    });
  });
}

//login protocol
function login_success() {
  /* ... */
  chrome.storage.local.set({logged_in: true});
  console.log('log success.');
  chrome.runtime.sendMessage({login: true});
  contentUpdate();
  // chrome.browserAction.setPopup({popup: "popup.html"});
  // change_kayak();
}

//logout protocol
function login_failure() {
  /* ... */
  chrome.storage.local.set({logged_in: false});
  console.log('not logged in.');
  chrome.runtime.sendMessage({login: false});
  aToken = "";
  // chrome.browserAction.setPopup({popup: "login.html"});
}

//picks up messages from other extension js's
chrome.runtime.onMessage.addListener(function(msg,sender) {
  if (msg.from == "content") {  //get content scripts tab id
    contentUpdate();
  }
});


//kayak flight regEx
function url_Collab() {


    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var currentURL = tabs[0].url;


        //regEx Kayak
        let regExKayak2way = '(http[s]?:\\/\\/)?(?<host>www.kayak.com+\\/)(?<request>[^\\/\\s]+\\/)(?<from>[^-\\/\\s]+)' +
            '(-)(?<destination>[^\\/\\s]+)(\\/)(?<startDate>[0-9]{4}-[0-9]{2}-[0-9]{2})(\\/)' +
            '(?<endDate>[0-9]{4}-[0-9]{2}-[0-9]{2})(\\?)(?<sort>.*)';
        let regExKayak1way = '(http[s]?:\\/\\/)?(?<host>www.kayak.com+\\/)(?<request>[^\\/\\s]+\\/)(?<from>[^-\\/\\s]+)' +
            '(-)(?<destination>[^\\/\\s]+)(\\/)(?<startDate>[0-9]{4}-[0-9]{2}-[0-9]{2})(?<sort>\\?.*)';

        console.log("current url " + currentURL);

        console.log(currentURL.match(regExKayak1way) || currentURL.match(regExKayak2way));
        // logic to filter out the ill-fitting urls
        if (currentURL.match(regExKayak1way) || currentURL.match(regExKayak2way)) {
            if (currentURL) {
                let urlMatch = currentURL.match(regExKayak2way);
                if (!(urlMatch)) {
                    urlMatch = currentURL.match(regExKayak1way)
                }


                if (urlMatch && (urlMatch.groups.request == 'flights/')) {

                    // all the url groups

                    let kgroups = urlMatch.groups;
                    // document.body.innerHTML = '<div class="d-inline p-2 bg-primary text-white">d-inline</div>\n' +
                    //     '<div class="d-inline p-2 bg-dark text-white">d-inline</div>'
                    chrome.storage.sync.set({originFlight: kgroups.from}, function () {
                        console.log("origin is " + kgroups.from);
                    });
                    chrome.storage.sync.set({destinationFlight: kgroups.destination}, function () {
                        console.log("destination is " + kgroups.destination);
                    });

                    if (currentURL.match(regExKayak2way)) {
                        chrome.storage.sync.set({originDate: kgroups.startDate}, function () {
                            console.log("start is " + kgroups.startDate);
                        });
                        chrome.storage.sync.set({returnDate: kgroups.endDate}, function () {
                            console.log("return is " + kgroups.endDate);
                        });
                    } else {

                        chrome.storage.sync.set({orignDate: kgroups.startDate}, function () {
                            console.log("origin is " + kgroups.startDate);
                        });
                        chrome.storage.sync.set({returnDate: 'null'}, function () {
                            console.log("return is null");
                        });
                    }

                    //generate legs

                    chrome.storage.sync.get('returnDate', function (RDdata) {
                        if (!(currentURL.match(regExKayak2way))) {
                            var legsData = JSON.stringify({
                                "numberOfTravelers": 1,
                                "legs": [
                                    {
                                        "origin": kgroups.from,
                                        "destination": kgroups.destination,
                                        "departureTime": kgroups.startDate,
                                        "departureTimePref": "anytime"
                                    }
                                ]
                            });
                            console.log("XXXXX One way " + legsData);
                            legslocal = legsData;
                            chrome.storage.sync.set({legs: legsData}, function () {
                                console.log("legs is " + legsData);
                            });
                        } else {
                            var legsData = JSON.stringify({
                                "numberOfTravelers": 1,
                                "legs": [
                                    {
                                        "origin": kgroups.from,
                                        "destination": kgroups.destination,
                                        "departureTime": kgroups.startDate,
                                        "departureTimePref": "anytime"
                                    },
                                    {
                                        "origin": kgroups.destination,
                                        "destination": kgroups.from,
                                        "departureTime": kgroups.endDate,
                                        "departureTimePref": "anytime"
                                    }
                                ]
                            });

                            console.log("XXXXX Two way " + legsData);
                            legslocal = legsData;
                        }
                    });
                }
            }
            search_1();
        }
    });





}






function search_1 () {
    //  var data = JSON.stringify({
   //    "numberOfTravelers": 1,
   //    "legs": [
   //      {
   //        "origin": "CAK",
   //        "destination": "IND",
   //        "departureTime": "2019-10-20",
   //        "departureTimePref": "anytime"
   //      },
   //      {
   //        "origin": "IND",
   //        "destination": "CAK",
   //        "departureTime": "2019-10-24",
   //        "departureTimePref": "anytime"
   //      }
   //    ]
   // });



// http requests
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        console.log(this.status);
      }
    });

    //"Basic c2ZfYXBpQDgwNHN0dWRpb3MuY29tOm9JUnNFb1lp"
    xhr.open("POST", "https://daphub.com/api/travelport/low-fare-search");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Basic c2ZfYXBpQDgwNHN0dWRpb3MuY29tOm9JUnNFb1lp");
    xhr.onload = function () {
      console.log(this.status);
      if (this.status == 200) {
        let searchkey = JSON.parse(this.responseText).key;
        let states = JSON.parse(this.responseText);
        chrome.storage.sync.set({stat: states}, function () {
          console.log('state is ' + JSON.stringify(states));
        })
        chrome.storage.sync.set({key: searchkey}, function () {
          console.log('key is ' + searchkey);
        })
        if (searchkey == undefined) {
          search_failure();
        } else {
          search_1_success();
        }
      } else {
        search_failure();
      }

    };

  var data = legslocal;

  console.log('data : ' + data);

  xhr.send(data);


}


function search_1_success() {
  chrome.storage.sync.get('key', function(keydata) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.status);
        if (this.status == 202) {
          setTimeout(function(){ search_1_success(); }, 2000);
        } else {
          if (this.status == 200) {
            search_2_success();
          } else {
            search_failure();
          }
        }
      }
    });

      // Replace the key parameter value with the key returned from step 1
    xhr.open("HEAD", "https://daphub.com/api/travelport/check-request-status?key=" + keydata.key);
    xhr.setRequestHeader("Authorization", "Basic c2ZfYXBpQDgwNHN0dWRpb3MuY29tOm9JUnNFb1lp");



    xhr.send(data);

  });
}

function search_2_success(){
  chrome.storage.sync.get('key', function(keydata) {
    // Replace the key parameter value with the key returned from step 1
    // "LowFareSearchRsp_awB5mEDWjuVIMxRZ"
    var data = JSON.stringify({
      "key": keydata.key,
      "formatForBot": true,
      "page": 1,
      "itemsPerPage": 9
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let result = this.responseText;


        chrome.storage.sync.set({results: result},
          function () {
              console.log("this is the response" + result);;
          });
      }
    });

    xhr.open("POST", "https://daphub.com/api/travelport/low-fare-search-response");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Basic c2ZfYXBpQDgwNHN0dWRpb3MuY29tOm9JUnNFb1lp");

    xhr.onload = function () {

      let states = JSON.parse(this.responseText);
      var numOfFlights = states.totalSolutionsCount;
      console.log(states);
      // chrome.storage.sync.set({results: states},
      //     function () {
      //         console.log('state is ' + states);
      //     })

      if (states){
          searchReady = true;
          console.log('search Ready');
          chrome.browserAction.setBadgeBackgroundColor({
                            color: 'blue',
                        });
          chrome.storage.sync.set({numOfFlights: JSON.stringify(numOfFlights)},
          function () {
              console.log("this is the num of results" + JSON.stringify(numOfFlights));;
          });

          chrome.browserAction.setBadgeText({text: JSON.stringify(numOfFlights)});
      }
      else {
        search_failure();
      }
    }

    xhr.send(data);
  });
}

function search_3_success() {
    // responds to other pages
    if (searchFail) {
        chrome.runtime.sendMessage({
            search: false
        });

    }
    else
    {
        searchReady = true;
        console.log('search Ready');

        chrome.runtime.sendMessage({
            search: true
        });
    }




}

function search_failure() {
    searchFail = true;
    console.log('could not find flights or something went wrong');
    searchReady = true;
    console.log('search Ready');
    chrome.browserAction.setBadgeBackgroundColor({
                            color: 'red',
                        });
          chrome.browserAction.setBadgeText({text: "X"});

}



chrome.runtime.onMessage.addListener(

    // Login Varifications
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
      if (request.submit == true) {
        //     fetch('http://www.example.com?par=0').then(r => r.text()).then(result => {
        // // Result now contains the response text, do what you want...
        //     })
        // Create the new request
        var xhr = new XMLHttpRequest();

        // Set the URL
        var url = 'https://gantgateway.com/oauth/token';

        // Populate the form data
        var data = new FormData();
        data.append('grant_type', 'password');
        data.append('client_id', '2');
        data.append('client_secret', 'd7pXysHr1RsHmphyyt8q5bc258XUh4CXevgZX4Sp');
        data.append('scope', '*');
        data.append('username', request.usrnm);
        data.append('password', request.psw);

        // Set the method and URL
        xhr.open('POST', url, true);

        // Specify that we should log the response to the console
        xhr.onload = function () {
          console.log(this.status);
          if (this.status == 200){
            let accesstoken = JSON.parse(this.responseText).access_token;
            let states = JSON.parse(this.responseText);
            chrome.storage.sync.set({stat: states}, function () {
              console.log('state is ' + states);
            })
            aToken = accesstoken;
            chrome.storage.sync.set({token: accesstoken}, function () {
              console.log('token is ' + accesstoken);
            })

            if (accesstoken == undefined) {
              login_failure();
            } else {
              login_success();
            }
          }
          else {
            login_failure();
          }
        };

        // Send the request
        xhr.send(data);

        // fetch('https://www.google.com/')
        // .then(function(response) {
        //   return response.json();
        // })
        // .then(function(myJson) {
        //   states = JSON.stringify(myJson);
        //   chrome.storage.sync.set({stat: states}, function() {
        //   console.log('state is ' + states);
        // })
        //   console.log(JSON.stringify(myJson));
        // });
        sendResponse({farewell: "goodbye"});
      }

      if (request.find == "url"){
        chrome.storage.sync.set({foundurl: toString(tabs[0].url)}, function () {
        console.log( "url is " + toString(tabs[0].url));
        });
        sendResponse({found: "url found"})
      }

      if (request.signout == true){
        login_failure();
      }


      if (request.book == true) {
          function call_search3() {
              if (rightpage) {
                  console.log(searchReady)
                  if (searchReady) {
                      loadingSearch = false;
                      console.log("success loading 3");
                      search_3_success();
                  } else {
                      console.log("loading");
                      setTimeout(function () {
                          call_search3();
                      }, 6000);
                  }
              }
          }
          chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
              if (searchFail) {
                      searchFail = false;
                      console.log('resetting fail');
                      bgurl = tabs[0].url;
                      searchReady = false;
                      url_Collab();
                  }
              call_search3();
              rightpage = true;
              loadingSearch = true;
          });
      }


  });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {


    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        chrome.storage.sync.get('mainurl', function (urldata) {
            chrome.storage.sync.get('logged_in', function (logdata) {
                console.log()
                if (logdata.logged_in)  {
                        console.log("message confirmed");
                        contentUpdate();
                    }
                chrome.runtime.sendMessage({
                    popcheck: true,
                    function(response) {
                        rightpage = false;
                        if (response.farewell) {
                            rightpage = true
                        }
                    }
                });


                console.log(" url is " + tabs[0].url);
                var varurl = tabs[0].url;
                let extensionRegEx = "(http[s]?:\\/\\/)?(chrome-extension+[^\\s]+\\/)(.*)";
                let regExKayak2way = '(http[s]?:\\/\\/)?(?<host>www.kayak.com+\\/)(?<request>[^\\/\\s]+\\/)' +
                    '(?<from>[^-\\/\\s]+)(-)(?<destination>[^\\/\\s]+)(\\/)(?<startDate>[0-9]{4}-[0-9]{2}-[0-9]{2})(\\/)' +
                    '(?<endDate>[0-9]{4}-[0-9]{2}-[0-9]{2})(\\?)';
                let regExKayak1way = '(http[s]?:\\/\\/)?(?<host>www.kayak.com+\\/)(?<request>[^\\/\\s]+\\/)' +
                    '(?<from>[^-\\/\\s]+)(-)(?<destination>[^\\/\\s]+)(\\/)(?<startDate>[0-9]{4}-[0-9]{2}-[0-9]{2})';


                console.log("kayak 2 " + varurl.match(regExKayak2way));
                console.log("kayak 1 " + varurl.match(regExKayak1way));
                //check if this is a kayak cite
                if (varurl.match(regExKayak2way) || varurl.match(regExKayak1way)) {
                    var newurl = "";
                    if (varurl.match(regExKayak2way)) {
                        newurl = varurl.match(regExKayak2way);
                    } else {
                        newurl = varurl.match(regExKayak1way);
                    }
                    var newmainurl = "";
                    if (bgurl.match(regExKayak2way)) {
                        newmainurl = bgurl.match(regExKayak2way);
                    } else {
                        newmainurl = bgurl.match(regExKayak1way);
                    }
                    var headpage = window.location.toString();
                    console.log("headpage: " + headpage + "  url tabs: " + tabs[0].url);
                    if (!headpage.match(extensionRegEx) || headpage != tabs[0].url) {


                        console.log(bgurl + "    " + varurl);
                        console.log((JSON.stringify(newmainurl) != JSON.stringify(newurl)));
                        if (bgurl != varurl) {


                            console.log((newmainurl == newurl));
                            console.log("works");
                            searchFail = false;
                            console.log('resetting fail');

                            searchReady = false;
                            url_Collab();
                            // badge updates
                            chrome.browserAction.setBadgeText({
                                'text': '...' //an empty string displays nothing!
                            });
                            chrome.browserAction.setBadgeBackgroundColor({
                                color: "#f3ac0c",
                            });


                            bgurl = varurl;
                        } else {
                            if (searchReady) {
                                chrome.storage.sync.get('numOfFlights', function (NFdata) {
                                    chrome.browserAction.setBadgeBackgroundColor({
                                        color: 'blue',
                                    });
                                    chrome.browserAction.setBadgeText({text: NFdata.numOfFlights});
                                });
                            }
                        }
                    }
                } else {
                    chrome.browserAction.setBadgeText({
                        'text': '' //an empty string displays nothing!
                    });
                }
            });
        });
    });
});










