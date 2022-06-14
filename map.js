mapboxgl.accessToken = "pk.eyJ1IjoidmluY2VudHZhbmJ1c2tpcmsiLCJhIjoiY2wxOHFjajk2MjFiMjNqbjF1bWxsaWt4YiJ9.RX0gnSYBbgZYKkfiXZ0h2g";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/vincentvanbuskirk/cl4bs9ydv000s14pfxa38fqpf",
  zoom: 10.5,
  maxZoom: 14,
  minZoom: 10.5,
  center: [-73.82, 40.756],
});

map.on("load", function () {
  map.addLayer(
    {
      id: "citibike_points",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/citibike_2020_start.geojson",
      },
      paint: {
        "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "tripCount"],
            10, 2,
            15000, 10
        ],
        "circle-color": "#0E6403",
        "circle-stroke-color": "#000000",
        "circle-opacity": 0.5,
      },
    },
    "waterway-label"
  );
});

map.on("click", "citibike_points", function (e) {
  var tripCount = e.features[0].properties.tripCount;
  var name = e.features[0].properties.start_station_name;

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(`
        <h6>
            ${name} Station
        </h6>
        <p>
            <b>${tripCount}</b> trips started here
        </p>

    `
    )
    .addTo(map);
})

map.on("mouseenter", "citibike_points", function () {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "citibike_points", function () {
  map.getCanvas().style.cursor = "";
});
