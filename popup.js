// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

    //repeated from background as a safegaurd
    function change_kayak(){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            // code: 'document.body.style.backgroundColor = "#4688f1";'
            // code: 'document.getElementbyId("L_8-").style.backgroundColor = "#4688f1";'
            // code: 'document.getElementbyClass("resultsContainer").style.backgroundColor = "#4688f1";'
            {code: 'function addGant() {\n' +
                    '    if (!(document.getElementById("gantex"))) {\n' +
                    '      wrappers = document.getElementsByClassName("resultWrapper");\n' +
                    '      priceTags = document.getElementsByClassName("Flights-Results-FlightPriceSection");\n' +
                    '      flightNumRegEx = "(?<airline>[A-z]*( [A-z]*)*) (?<flightNum>[0-9]*)";\n' +
                    '      cityRegEx = "\\\\((?<code>[A-Z]{3})\\\\)";\n' +
                    '      dateRegEx = "[A-z]{3}, (?<month>[A-z]{3}) (?<day>[0-9]{1,2})";\n' +
                    '      timeRegEx = "(?<hour>[0-9]{1,2}):(?<min>[0-9]{1,2}) (?<TOD>[a-z]{2})";\n' +
                    '\n' +
                    '\n' +
                    '      function timeChanger(time){\n' +
                    '        time = time.match(timeRegEx);\n' +
                    '        if (time.groups.TOD == "am")  {\n' +
                    '          hour = time.groups.hour\n' +
                    '          time.groups.min\n' +
                    '        }\n' +
                    '        else  {\n' +
                    '          hour = String(parseInt(time.groups.hour) + 12)\n' +
                    '        }\n' +
                    '        return hour + ":" + time.groups.min\n' +
                    '      }\n' +
                    '\n' +
                    '      for (let i = 0; i < wrappers.length; i++) {\n' +
                    '        var flightIDs = wrappers[i].getElementsByClassName("segment-row");\n' +
                    '        var GIAURL = "https://gantgateway.com/start-gia?";\n' +
                    '        for (let j = 0; j < flightIDs.length; j++)  {\n' +
                    '          date = flightIDs[j].getElementsByClassName("leg-dates-set")[0].innerText.match(dateRegEx);\n' +
                    '          times = flightIDs[j].getElementsByClassName("time");\n' +
                    '          cities = flightIDs[j].getElementsByClassName("city");\n' +
                    '          let flightnum = flightIDs[j].getElementsByClassName("planeDetails details-subheading")[0].innerText.match(flightNumRegEx);\n' +
                    '          airline = flightnum.groups.airline;\n' +
                    '          airlineCode = "";\n' +
                    '          switch (airline)  {\n' +
                    '            case "Delta":\n' +
                    '              airline = "DL";\n' +
                    '              break;\n' +
                    '            case "American Airlines":\n' +
                    '              airline = "AA";\n' +
                    '              break;\n' +
                    '            case "United Airlines":\n' +
                    '              airline = "UA";\n' +
                    '              break;\n' +
                    '            default:\n' +
                    '              airline = airline;\n' +
                    '          }\n' +
                    '          // if (!flightIDs[j].getElementById("BE9h-layover-text"))  {\n' +
                    '          //   let layover = flightIDs[j].getElementsByClassName("BE9h-layover-text");\n' +
                    '          // }\n' +
                    '          GIAURL += "segment[]=" + cities[0].innerText.match(cityRegEx).groups.code + "-" +\n' +
                    '              cities[1].innerText.match(cityRegEx).groups.code + "|" + airline + "-" + flightnum.groups.flightNum +\n' +
                    '              "|" + date.groups.month + date.groups.day + "|" + timeChanger(times[0].innerText) +"-"+ timeChanger(times[1].innerText) ;\n' +
                    '\n' +
                    '          if (j + 1 != flightIDs.length)  {\n' +
                    '            GIAURL += "&";\n' +
                    '          }\n' +
                    '        }\n' +
                    '        console.log(GIAURL);\n' +
                    '        img = document.createElement("div")\n' +
                    '        img.id = "gantex";\n' +
                    '        img.innerHTML = "<div class=\\"above-button\\">\\n" +\n' +
                    '            "</div>\\n" +\n' +
                    '            "<div id=\\"t6zr-mb-dropdown-grid\\" class=\\"keel-grid multibookGrid\\" role=\\"listbox\\">\\n" +\n' +
                    '            "<div class=\\"col col-best \\">\\n" +\n' +
                    '            "<div\\n" +\n' +
                    '            "id=\\"t6zr-mb-best\\"\\n" +\n' +
                    '            "class=\\"Common-Widgets-Button-ButtonDeprecated Common-Widgets-Button-Button Button-Gradient ui-button size-m bookingButton \\"\\n" +\n' +
                    '            "style=\\"background:linear-gradient(135deg,#fb0704 0%,#a80503 100%)!important\\"\'" +\n' +
                    '            "type=\\"button\\"\\n" +\n' +
                    '            "aria-hidden=\\"false\\"\\n" +\n' +
                    '            "role=\\"button\\" >\\n" +\n' +
                    '            "<div id=\\"t6zr-mb-bE-1f47085cb3d\\"\\n" +\n' +
                    '            "class=\\"Common-Booking-MultiBookProvider Theme-button-small virtual-interline featured-provider cheapest \\"\\n" +\n' +
                    '            "aria-hidden=\\"false\\"\\n" +\n' +
                    '            "data-test-featured-booking data-test-price=\\"$115\\"\\n" +\n' +
                    '            ">\\n" +\n' +
                    '            "<a href= " +  "\\"" + GIAURL + "\\"\\n" +\n' +
                    '            "target=\\"_blank\\"\\n" +\n' +
                    '            "id=\\"t6zr-mb-bE-1f47085cb3d-booking-link\\"\\n" +\n' +
                    '            "class=\\"booking-link\\"\\n" +\n' +
                    '\n' +
                    '            "role=\\"button\\"\\n" +\n' +
                    '            "tabindex=\\"0\\"\\n" +\n' +
                    '            "aria-label=\\"View Deal\\"\\n" +\n' +
                    '            ">\\n" +\n' +
                    '            "<span class=\\"custom-text\\">\\n" +\n' +
                    '            "Gant Travel\\n" +\n' +
                    '            "</span>\\n" +\n' +
                    '            "</a>\\n" +\n' +
                    '            "</div>\\n" +\n' +
                    '            "</div>\\n" +\n' +
                    '            "</div>\\n" +\n' +
                    '            "</div>"\n' +
                    '        wrappers[i].getElementsByClassName("Flights-Results-FlightPriceSection")[0].append(img);\n' +
                    '      }\n' +
                    '    }\n' +
                    '    setTimeout(function(){ addGant(); }, 3000)\n' +
                    '  }\n' +
                    '  addGant();'});
      });
    }

    // change_kayak();


    let regExKayak2way = '(http[s]?:\\/\\/)?(?<host>www.kayak.com+\\/)(?<request>[^\\/\\s]+\\/)(?<from>[^-\\/\\s]+)' +
        '(-)(?<destination>[^\\/\\s]+)(\\/)(?<startDate>[0-9]{4}-[0-9]{2}-[0-9]{2})(\\/)' +
        '(?<endDate>[0-9]{4}-[0-9]{2}-[0-9]{2})(\\?)(?<sort>.*)'
    let regExKayak1way = '(http[s]?:\\/\\/)?(?<host>www.kayak.com+\\/)(?<request>[^\\/\\s]+\\/)(?<from>[^-\\/\\s]+)' +
        '(-)(?<destination>[^\\/\\s]+)(\\/)(?<startDate>[0-9]{4}-[0-9]{2}-[0-9]{2})(?<sort>\\?.*)'
    // chrome.storage.sync.set({foundurl: toString(tabs[0].url)}, function () {
    //     console.log( "url is " + toString(tabs[0].url));
    //     });
    let url = tabs[0].url;

    let urlMatch = url.match(regExKayak2way);
    if (!(urlMatch)) {
        urlMatch = url.match(regExKayak1way)
    }


    if (urlMatch && urlMatch.groups.request == 'flights/') {
        let flights = document.getElementById('link');
        let locHTML = document.getElementById('location');
        let timeHTML = document.getElementById('date');


        let kgroups = urlMatch.groups;
        // document.body.innerHTML = '<div class="d-inline p-2 bg-primary text-white">d-inline</div>\n' +
        //     '<div class="d-inline p-2 bg-dark text-white">d-inline</div>'
        locHTML.innerHTML = '<h5>Locations</h5>Departure: ' + kgroups.from +
            '<br></br> Arrival: ' + kgroups.destination;
        chrome.storage.sync.set({originFlight: kgroups.from}, function () {
                console.log( "origin is " + kgroups.from );
        });
        chrome.storage.sync.set({destinationFlight: kgroups.destination}, function () {
                console.log( "destination is " + kgroups.destination );
        });

        if (url.match(regExKayak2way)) {
            timeHTML.innerHTML = '<h5>Dates</h5> Leaving: ' +
                kgroups.startDate + '<br></br> Returning: ' + kgroups.endDate;
            chrome.storage.sync.set({originDate: kgroups.startDate}, function () {
                console.log( "start is " + kgroups.startDate );
            });
            chrome.storage.sync.set({returnDate: kgroups.endDate}, function () {
                console.log( "return is " + kgroups.endDate );
            });
        }
         else {
            timeHTML.innerHTML = '<h5>Dates</h5> Leaving: ' +
                kgroups.startDate;
            chrome.storage.sync.set({orignDate: kgroups.startDate}, function () {
                console.log( "origin is " + kgroups.startDate );
            });
            chrome.storage.sync.set({returnDate: 'null'}, function () {
                console.log( "return is null" );
            });
        }
        let bookButton = document.getElementById('bookButton');
        bookButton.innerHTML = 'View Now';
        bookButton.addEventListener('click', function() {
            searchQueue();
                    })
    }
    else
    {
        let bookButton = document.getElementById('bookButton');
        bookButton.innerHTML = 'Gant Gateway'
        bookButton.addEventListener('click', function() {
             var newURL = "https://gantgateway.com/login";
            chrome.tabs.create({ url: newURL });
        })
    }



    //generate legs

    // chrome.storage.sync.get('originFlight', function(OFdata) {
    //   chrome.storage.sync.get('destinationFlight', function(DFdata) {
    //     chrome.storage.sync.get('originDate', function(ODdata) {
    //       chrome.storage.sync.get('returnDate', function(RDdata) {
    //         if (RDdata.returnDate == "null") {
    //           var legsData = JSON.stringify({
    //           "numberOfTravelers": 1,
    //             "legs": [
    //               {
    //                 "origin": OFdata.originFlight,
    //                 "destination": DFdata.destinationFlight,
    //                 "departureTime": ODdata.originDate,
    //                 "departureTimePref": "anytime"
    //               }
    //             ]
    //           });
    //           console.log("XXXXX One way " + legsData);
    //           chrome.storage.sync.set({legs: legsData}, function () {
    //               console.log( "legs is " + legsData );
    //           });
    //         }
    //         else
    //         {
    //           var legsData = JSON.stringify({
    //             "numberOfTravelers": 1,
    //             "legs": [
    //               {
    //                 "origin": OFdata.originFlight,
    //                 "destination": DFdata.destinationFlight,
    //                 "departureTime": ODdata.originDate,
    //                 "departureTimePref": "anytime"
    //               },
    //               {
    //                 "origin": DFdata.destinationFlight,
    //                 "destination": OFdata.originFlight,
    //                 "departureTime": RDdata.returnDate,
    //                 "departureTimePref": "anytime"
    //               }
    //             ]
    //           });
    //           console.log("XXXXX Two way " + legsData);
    //           chrome.storage.sync.set({legs: legsData}, function () {
    //               console.log( "legs is " + legsData );
    //           });
    //         }
    //       });
    //     });
    //   });
    // });
});


function searchQueue() {
    let bookBox = document.getElementById(('bookBox'));
    bookBox.innerHTML = "<div class=\"spinner-grow text-danger\" style=\"width: 3rem; height: 3rem;\" role=\"status\">\n" +
    "  <span class=\"sr-only\">Loading...</span>\n" +
    "</div>";

    chrome.runtime.sendMessage({
        book: true
    });
    console.log("searching")




    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

            if (request.search == true) {
                // document.getElementById("bookBox").innerHTML = "<p class=\"text-monospace\">Success</p>" +
                //     "<button id=\"bookButton\" type=\"button\" " +
                //     "class=\"btn btn-danger btn-lg btn-block\">Book Now</button>";
                window.location.href="results.html";
            }
            if (request.search == false) {
                document.getElementById("bookBox").innerHTML = "<p class=\"text-monospace\">" +
                    "Something went wrong</p><button id=\"bookButton\" type=\"button\" " +
                    "class=\"btn btn-danger btn-lg btn-block\">Book Now</button>";
                document.getElementById("bookBox").addEventListener('click', function() {
                    searchQueue();
                    })
            }
        }
    );
}


let bookButton = document.getElementById('bookButton');
bookButton.onclick = function(element) {
    searchQueue();

}


let signOutButton = document.getElementById('signOutButton');
signOutButton.onclick = function(element) {
  chrome.runtime.sendMessage({signout: true});
};

chrome.runtime.onMessage.addListener(
  //  messages from background
  function(request, sender, sendResponse) {
      console.log(sender.tab ?
          "from a content script:" + sender.tab.url :
          "from the extension");

      //switches to login
      if (request.login == false){
          window.location.href="login.html";
      }
      if (request.popcheck) {
          sendResponse({farewell: true});
      }
  });