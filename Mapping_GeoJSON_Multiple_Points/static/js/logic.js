// Add console.log to check to see if our code is working
console.log("working");


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create base layer
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with setView center and zoom level
let map = L.map('mapid', {
    center : [40.7, -94.5],
    zoom: 4,
    layers: [streets]
});


// Pass our map layers into layers control, add layers control to map
L.control.layers(baseMaps).addTo(map)


// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/jhackmeyer/Mapping_Earthquakes/main/Mapping_GeoJSON_Multiple_Points/majorAirports.json";


// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h3>Airport Code: " + feature.properties.faa + "</h3> <hr> <h3>Airport Name: " + feature.properties.name + "</h3>");
    }
}).addTo(map);
});

