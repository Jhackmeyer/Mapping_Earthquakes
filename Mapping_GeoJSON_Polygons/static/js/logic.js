// Add console.log to check to see if our code is working
console.log("working");


// We create the light tile layer.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create base layer
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with setView center and zoom level
let map = L.map('mapid', {
    center : [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});


// Pass our map layers into layers control, add layers control to map
L.control.layers(baseMaps).addTo(map)


// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/jhackmeyer/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// let myStyle = {
//     color: "#ffffa1",
//     weight:2};


// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
    console.log(data);

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(map);
});

