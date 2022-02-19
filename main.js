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

  map.addLayer({
    id: "amtrak",
    type: "line",
    source: "amtrak",
    "line-width": 1,
    paint: {
      "line-color": "#00ffff",
    },
  });

  map.on("mouseenter", "amtrak", (e) => {
    let properties = e.features[0].properties;
    let routename = properties["NAME"];
    let message = `
      <h3>${routename}</h3>
    `;
    playosc();
    let popup = new mapboxgl.Popup({
      closeButton: false,
      className: "popup-style",
    });

    popup.setLngLat(e.lngLat).setHTML(message).addTo(map);
  });

  map.on("mouseleave", "amtrak", (e) => {
    stoposc();
    let popup = document.getElementsByClassName("popup-style");
    if (popup.length) {
      popup[0].remove();
    }
  });
});
