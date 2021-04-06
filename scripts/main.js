//slider - animates over 100vh height
const element = document.querySelector('.animate-slider');
element.classList.add('animate__animated', 'animate__slideOutUp');

element.addEventListener('animationend', () => {
    var elem = document.getElementById("intro-slider");
    elem.remove();
});

// Er word een functie aangemaakt waarbij er een variable X word gedeclareerd. Hierbij word er verwezen naar het ID in de HTML my top nav en word een een if statement aangemaakt die aangeeft met verschillende operators: "Als x gelijk aan is topnav dan is X resonsive. Anders wordt X topnav."

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiYmFzdmFuaXRlcnNvbiIsImEiOiJja21rbDh5d2YxMXlxMm5tcWR4aXZvdjV1In0.bzGVgk2pD-8MEDcbNj1GXA';

// var long;
// var lat;
var land;
// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [30.2194, 51.2705],
  style: 'mapbox://styles/mapbox/dark-v10',
  pitch: 45,
  zoom: 11.15
});
// geocoder toevoegen
var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: 'country,region,place,postcode,locality,neighborhood',
  mapboxgl: mapboxgl
});

// Zoekbalk
map.addControl(geocoder, 'top-left');

// Navigatie knoppen
map.addControl(new mapboxgl.NavigationControl());

//De lats en long in de website en var's
geocoder.on('result', function(response) {
  document.getElementById('long').innerHTML = response.result.center[0];
  // long = response.result.center[0];
  document.getElementById('lat').innerHTML = response.result.center[1];
  // lat = response.result.center[1];
  document.getElementById('city').innerHTML = response.result.place_name;
  // Height();
  var length = response.result.context.length - 1;
  console.log(length);
  land = response.result.context[length].short_code;
  console.log(land);
  Country();
});

function Country(){
  var rescountries = "https://restcountries.eu/rest/v2/alpha/" + land;
  fetch(rescountries)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
    document.getElementById('flag').src = response.flag;
    document.getElementById('people').innerHTML = response.demonym;
    var languageTotal = "";
    for(var i = 0; i<response.languages.length ; i++){
      languageTotal = languageTotal + " " + response.languages[i].name + "<br>"
    }
    document.getElementById('languages').innerHTML = languageTotal;
    var currencyTotal = "";
    for(var i = 0; i<response.currencies.length ; i++){
      currencyTotal = currencyTotal + " " + response.currencies[i].name + "<br>"
    }
    document.getElementById('currency').innerHTML = currencyTotal;
    var timezoneTotal = "";
    for(var i = 0; i<response.timezones.length ; i++){
      timezoneTotal = timezoneTotal + " " + response.timezones[i] + "<br>"
    }
    document.getElementById('timezone').innerHTML = timezoneTotal;
    document.getElementById('region').innerHTML = response.subregion;
  })
}
