// Add console.log to check to see if our code is working
console.log("working");


// We create the light tile layer.
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create base layer
let baseMaps = {
    Night: night,
    Day: day
};

// Create the map object with setView center and zoom level
let map = L.map('mapid', {
    center : [44.0, -80.0],
    zoom: 4,
    layers: [night]
});


// Pass our map layers into layers control, add layers control to map
L.control.layers(baseMaps).addTo(map)


// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/jhackmeyer/Mapping_Earthquakes/main/torontoRoutes.json";

let myStyle = {
    color: "#ffffa1",
    weight:2};


// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3> <hr> <h3>Destination: " + feature.properties.dst + "</h3>");
    }
}).addTo(map);
});

