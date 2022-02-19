import { playosc, stoposc } from "/synth.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW1vcmxleTAzOTUiLCJhIjoiY2t6NmJraWpxMHlrMjMxdHZkYTk3Zm05eCJ9.jK-jyoUNhxVfg3NIbNj6yQ";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mmorley0395/ckz6blpgt001514nn0o8s6lfn",
  center: [-74.034, 40.652],
  zoom: 6.77,
  pitch: 0,
});

map.on("load", () => {
  // LOAD DATA: add geojson layer
  map.addSource("amtrak", {
    type: "geojson",
    data: "https://opendata.arcgis.com/datasets/baa5a6c4d4ae4034850e99aaca38cfbb_0.geojson",
  });

  // ADD LAYER
  map.addLayer({
    id: "amtrak",
    type: "line",
    source: "amtrak",
    "line-width": 1,
    paint: {
      "line-color": "#00ffff",
    },
  });

  // Add a popup to the map when the user mouses over a RR line
  map.on("mouseenter", "amtrak", (e) => {
    // get the attributes for the specific feature under the mouse
    let properties = e.features[0].properties;
    let routename = properties["NAME"];
    let message = `
      <h3>${routename}</h3>
    `;

    // create the popup and add it to the map
    let popup = new mapboxgl.Popup({
      closeButton: false,
      className: "popup-style",
    });

    popup.setLngLat(e.lngLat).setHTML(message).addTo(map);
  });

  // Remove popup from the map when the user's mouse is no longer
  // hovering over a RR line
  map.on("mouseleave", "amtrak", (e) => {
    // get all HTML elements with the class name 'popup-style'
    let popup = document.getElementsByClassName("popup-style");

    // remove all elements with this class name
    if (popup.length) {
      popup[0].remove();
    }
  });
});

map.on("mouseenter", "amtrak", (e) => {
  playosc();
});

map.on("mouseleave", "amtrak", (e) => {
  stoposc();
});

// create web audio api context
