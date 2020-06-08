mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhZGxhbmkiLCJhIjoiY2szNGFmd3drMGtkajNibnl3dzYyMjFubSJ9.6wzDILEjYcWqou443ToV3g';
var map = new mapboxgl.Map({
    container: 'map',
    center: [-1.217003, 52.772848],
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 13,
});

var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-1.218761, 52.772243]
        },
        properties: {
            title: 'Office 1',
            description: 'Loughborough'
        }
    },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-1.214054, 52.772363]
            },
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        }]
};

// add markers to map
geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(map);
});
