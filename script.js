/* eslint-disable no-undef */
/**
 * multiple tile layers
 */

// magnification with which the map will start
const zoom = 9;
// co-ordinates
const lat = 25.064631023742265;
const lng = 121.52123384367552;

// const osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
// const cartoDB = '<a href="http://cartodb.com/attributions">CartoDB</a>';

// const osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const osmAttrib = `&copy; ${osmLink} Contributors`;
// const landUrl =
//   "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png";
// const cartoAttrib = `&copy; ${osmLink} Contributors & ${cartoDB}`;

// const osmMap = L.tileLayer(osmUrl, { attribution: osmAttrib });
// const landMap = L.tileLayer(landUrl, { attribution: cartoAttrib });

var GeoportailFrance_orthos = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
	attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	minZoom: 2,
	maxZoom: 19,
	apikey: 'choisirgeoportail',
	format: 'image/jpeg',
	style: 'normal'
});




// config map
let config = {
  layers: [GeoportailFrance_orthos],
  minZoom: 7,
  maxZoom: 12,
};

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// var baseLayers = {
//   "OSM Mapnik": osmMap,
//   CartoDB: landMap,
// };

// L.control.layers(baseLayers).addTo(map);
// const style = document.createElement("style");
// style.textContent = `.leaflet-tile-container { filter:saturate(2) hue-rotate(5deg) brightness(0.5);}`;
// document.head.appendChild(style);




map
  .locate({
    // https://leafletjs.com/reference-1.7.1.html#locate-options-option
    setView: true,
    enableHighAccuracy: true
  })
  // if location found show marker and circle
  .on("locationfound", (e) => {
    console.log(e);
    // marker
    const marker = L.marker([e.latitude, e.longitude]).bindPopup(
      "Your are here :)"
    );
    // circle
    const circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
      weight: 2,
      color: "red",
      fillColor: "red",
      fillOpacity: 0.1,
    });
    // add marker
    map.addLayer(marker);
    // add circle
    map.addLayer(circle);
  })
  // if error show alert
  .on("locationerror", (e) => {
    console.log(e);
    alert("Location access denied.");
  });
