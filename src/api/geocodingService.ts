const { Geocode, Directions } = require("openrouteservice-js");

function getGeocode(text: any, country: any) {
  const MyGeocodeApi = new Geocode({
    api_key: "5b3ce3597851110001cf624848c55ecec2484715aa4b6ca2cb0fec64",
  });
  //const geojson = {};
  return MyGeocodeApi.geocode({
    text: text,
    boundary_country: [country],
    layers: ["locality", "localadmin"],
  });
}

function getReverseGeo(coordinates: any) {
  const MyGeocodeApi = new Geocode({
    api_key: "5b3ce3597851110001cf624848c55ecec2484715aa4b6ca2cb0fec64",
  });
  //const geojson = {};
  return MyGeocodeApi.reverseGeocode({
    point: { lat_lng: [coordinates.lat, coordinates.lon] },
    boundary_country: ["IT"],
    layers: ["locality", "localadmin"],
  });
}

//TODO: usare questo e rinominare
function provaGetDirections(coords:any, profile:string) {
  const MyDirectionsApi = new Directions({
    api_key: "5b3ce3597851110001cf624848c55ecec2484715aa4b6ca2cb0fec64",
  });
  return MyDirectionsApi.calculate({
    coordinates: coords,
    profile: profile,
    extra_info: ["waytype", "steepness"],
    language: "it",
    format: "geojson",
  });
}

export { getGeocode, getReverseGeo,provaGetDirections };
