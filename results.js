

'use strict';

const max = 9;

let loadButton = document.getElementById("loadButton");
let loadBox = document.getElementById("loadBox");

let page1 = document.getElementById('buttonDiv1');
chrome.storage.sync.get('results', function(data) {
    let result = data.results;
    const flights = JSON.parse(result).formattedSolutions;
    console.log("FLIGHTS \n " +
        JSON.stringify(flights)
    );
    let regexOneway = '(?<airline>[A-z]*) from (?<price>\\$[0-9]*.[0-9]{2}) (\\\u2022 )(?<hours>[0-9]*)h (?<minutes>[0-9]{1,2})m '
    let flightCount = 2;
    let cap = 3;
    let bottom = 0;

    function constructFlights(flights) {
        chrome.storage.sync.get('numOfFlights', function(NFdata) {
        let flightInfo = document.getElementById("info");
        flightInfo.innerText = "We found " + NFdata.numOfFlights + " for your search. Here are the top " + String(cap)
            + " results selected by Gant GIA";
    });
        for ( let i = bottom; i < cap; i ++ ) {

            let flight = document.createElement('div');
            flight.className = "card";
            console.log("name:     " + flights[i].name)
            let parseName = flights[i].name.match(regexOneway);
            flight.innerHTML = "    <div class=\"card-header\" id=\"heading" + flightCount +"\">\n" +
                "      <h2 class=\"mb-0\">\n" +
                "        <button class=\"btn btn-sm btn-block collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse" + flightCount +"\" aria-expanded=\"false\" aria-controls=\"collapse"+ flightCount +"\">\n" +
                parseName.groups.airline + "   " + parseName.groups.price +
                "         &#9660</button>\n" +
                "      </h2>\n" +
                "    </div>\n" +
                "    <div id=\"collapse" + flightCount +"\" class=\"collapse\" aria-labelledby=\"heading" + flightCount +"\" data-parent=\"#accordionExample\">\n" +
                "      <div style=\"font-size: 0.85rem;     flex: 1 1 auto;\n" +
                "    padding: 1.25rem;\">" +
                '<p style= \"font-size: 0.85rem \" >Score: ' + (flights[i].overallScore * 10)  + '/10 <br> ' + flights[i].shortDescription.replace(/\n/g, "<br />"); +
                '</p></div>\n' +
                "      </div>\n" +
                "    </div>\n";
            flightCount ++;
            page1.appendChild(flight);


        }

        if (cap == max) {
            loadBox.innerHTML = '<p> All results are in </p>';
        }

    }

    constructFlights(flights);

    loadButton.onclick = function(element) {

        if (cap < max) {
            cap += 3;
            bottom += 3;
            constructFlights(flights);
        }
    }

});
