import { Geolocation } from "@capacitor/geolocation";

export async function getMyPositionCoords() {
  const position = await Geolocation.getCurrentPosition();
  const coords = position.coords;
  console.log(coords);
  return { lat: coords.latitude, lng: coords.longitude };
}
