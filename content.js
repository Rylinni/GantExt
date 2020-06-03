let token = ""
let change = true

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("updating Gant Info");
  if (token != request.indentificador) {
    token = request.identificador;
    change = true
  }
});


function addGant() {
  chrome.runtime.sendMessage({from:"content"});
  if (!(document.getElementById("gantex"))) {
    wrappers = document.getElementsByClassName("resultWrapper");
    priceTags = document.getElementsByClassName("Flights-Results-FlightPriceSection");
    flightNumRegEx = "(?<airline>[A-z]*( [A-z]*)*) (?<flightNum>[0-9]*)";
    cityRegEx = "\\((?<code>[A-Z]{3})\\)";
    dateRegEx = "[A-z]{3}, (?<month>[A-z]{3}) (?<day>[0-9]{1,2})";
    timeRegEx = "(?<hour>[0-9]{1,2}):(?<min>[0-9]{1,2}) (?<TOD>[a-z]{2})";

    function timeChanger(time) {
      time = time.match(timeRegEx);
      if (time.groups.TOD == "am") {
        hour = time.groups.hour
        time.groups.min
      } else {
        hour = String(parseInt(time.groups.hour) + 12)
      }
      return hour + ":" + time.groups.min
    }
    //mmanipulates eacg individual piece
    for (let i = 0; i < wrappers.length; i++) {
      var flightIDs = wrappers[i].getElementsByClassName("segment-row");
      var GIAURL = "";
      for (let j = 0; j < flightIDs.length; j++) {
        date = flightIDs[j].getElementsByClassName("leg-dates-set")[0].innerText.match(dateRegEx);
        times = flightIDs[j].getElementsByClassName("time");
        cities = flightIDs[j].getElementsByClassName("city");
        let flightnum = flightIDs[j].getElementsByClassName("planeDetails details-subheading")[0].innerText.match(flightNumRegEx);
        airline = flightnum.groups.airline;
        switch (airline) {
          //each airline case
          case "Delta":
            airline = "DL";
            break;
          case "American Airlines":
            airline = "AA";
            break;
          case "United Airlines":
            airline = "UA";
            break;
          default:
            airline = airline;
        }
        GIAURL += "\t<input type=\"hidden\" name=\"segments[]\"  value=\"" + cities[0].innerText.match(cityRegEx).groups.code + "|" +
            cities[1].innerText.match(cityRegEx).groups.code + "|" + airline + "|" + flightnum.groups.flightNum +
            "|" + date.groups.month + " " + date.groups.day + "|" + timeChanger(times[0].innerText) + "|" + timeChanger(times[1].innerText) + "\"/>\n";

      }
      console.log(GIAURL);
      img = document.createElement("div")
      img.id = "gantex";
      img.innerHTML =

          "<form method=\"post\" action=\"https://www.gantgateway.com/extension-booking\"; target=\"_blank\">\n" +
          "\t<input type=\"hidden\" name=\"source\" value=\"kayak\"/>\n" +
          GIAURL +
          "\t<input class = \"GantToken\" type=\"hidden\" name=\"access_token\" value=\"" + token + "\"/>\n" +
          "\t<input  style=\"  padding: 0 2.4em; background:linear-gradient(135deg,#fb0704 0%,#a80503 100%)!important\"' " +
          "role = \"button\" class=\"Common-Widgets-Button-ButtonDeprecated Common-Widgets-Button-Button Button-Gradient ui-button size-m bookingButton \" type=\"submit\" name=\"submit\" value=\"Gant Travel\"/>\n" +
          "</form>"
      wrappers[i].getElementsByClassName("Flights-Results-FlightPriceSection")[0].append(img);
    }
  }
  if (change) {
    change = false;
    let g_tokens = document.getElementsByClassName("GantToken");
    for (let j = 0; j < g_tokens.length; j++)  {
      g_tokens[j].value = token;
    }
  }
  setTimeout(function () {
    addGant();
  }, 3000)
}

addGant();


// for (let i = 0; i < priceTags.length; i++) {
//         img = document.createElement("div")
//         img.id = "gantex";
//         img.innerHTML = "<div class=\"above-button\">\n" +
//             "</div>\n" +
//             "<div id=\"t6zr-mb-dropdown-grid\" class=\"keel-grid multibookGrid\" role=\"listbox\">\n" +
//             "<div class=\"col col-best \">\n" +
//             "<div\n" +
//             "id=\"t6zr-mb-best\"\n" +
//             "class=\"Common-Widgets-Button-ButtonDeprecated Common-Widgets-Button-Button Button-Gradient ui-button size-m bookingButton \"\n" +
//             "type=\"button\"\n" +
//             "aria-hidden=\"false\"\n" +
//             "role=\"button\" >\n" +
//             "<div id=\"t6zr-mb-bE-1f47085cb3d\"\n" +
//             "class=\"Common-Booking-MultiBookProvider Theme-button-small virtual-interline featured-provider cheapest \"\n" +
//             "aria-hidden=\"false\"\n" +
//             "data-test-featured-booking data-test-price=\"$115\"\n" +
//             ">\n" +
//             "<a href=\"https://gantgateway.com/booking-bot/0033C000008inTTQAY\"\n" +
//             "target=\"_blank\"\n" +
//             "id=\"t6zr-mb-bE-1f47085cb3d-booking-link\"\n" +
//             "class=\"booking-link\"\n" +
//             "role=\"button\"\n" +
//             "tabindex=\"0\"\n" +
//             "aria-label=\"View Deal\"\n" +
//             ">\n" +
//             "<span class=\"custom-text\">\n" +
//             "Gant Travel\n" +
//             "</span>\n" +
//             "</a>\n" +
//             "</div>\n" +
//             "</div>\n" +
//             "</div>\n" +
//             "</div>"
//         priceTags[i].append(img)
//       }



// "<div class=\"above-button\">\n" +
          // "</div>\n" +
          // "<div id=\"t6zr-mb-dropdown-grid\" class=\"keel-grid multibookGrid\" role=\"listbox\">\n" +
          // "<div class=\"col col-best \">\n" +
          // "<div\n" +
          // "id=\"t6zr-mb-best\"\n" +
          // "class=\"Common-Widgets-Button-ButtonDeprecated Common-Widgets-Button-Button Button-Gradient ui-button size-m bookingButton \"\n" +
          // "style=\"background:linear-gradient(135deg,#fb0704 0%,#a80503 100%)!important\"'" +
          // "type=\"button\"\n" +
          // "aria-hidden=\"false\"\n" +
          // "role=\"button\" >\n" +
          // "<div id=\"t6zr-mb-bE-1f47085cb3d\"\n" +
          // "class=\"Common-Booking-MultiBookProvider Theme-button-small virtual-interline featured-provider cheapest \"\n" +
          // "aria-hidden=\"false\"\n" +
          // "data-test-featured-booking data-test-price=\"$115\"\n" +
          // ">\n" +
          // "<a href= " +  "\"" + GIAURL + "\"\n" +
          // "target=\"_blank\"\n" +
          // "id=\"t6zr-mb-bE-1f47085cb3d-booking-link\"\n" +
          // "class=\"booking-link\"\n" +
          //
          // "role=\"button\"\n" +
          // "tabindex=\"0\"\n" +
          // "aria-label=\"View Deal\"\n" +
          // ">\n" +
          // "<span class=\"custom-text\">\n" +
          // "Gant Travel\n" +
          // "</span>\n" +
          // "</a>\n" +
          // "</div>\n" +
          // "</div>\n" +
          // "</div>\n" +
          // "</div>" +