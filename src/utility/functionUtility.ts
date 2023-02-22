import { LatLngExpression } from "leaflet";
import { PoiRequest } from "./types";

export function printHours(day: string, hours: string[]): string {
  if (hours.length !== 2 && hours.length !== 4) return day + " - chiuso";
  else if (hours.length === 2) return day + ": " + hours[0] + " - " + hours[1];
  else
    return (
      day +
      ": " +
      hours[0] +
      " - " +
      hours[1] +
      " | " +
      hours[2] +
      " - " +
      hours[3]
    );
}

export function renderHours(hours: string[]) {
  if (hours.length === 2) return hours[0] + " - " + hours[1];
  if (hours.length === 4)
    return hours[0] + " - " + hours[1] + " | " + hours[2] + " - " + hours[3];
  return "chiuso";
}

export function printArray(array: any[]) {
  let result = "";
  result = array[0] + "; ";
  for (let index = 1; index < array.length; index++) {
    const element = array[index];
    result = result + element + "; ";
  }
  return result;
}

export function printTypes(request?: PoiRequest) {
  let result = "";
  request?.types.forEach((t) => {
    result += t.name + " ";
  });
  return result;
}

export function mToKmRounded(metres: number) {
  let casted = Math.round((metres + Number.EPSILON) * 1000) / 1000;
  let km = casted / 1000;
  return Math.round((km + Number.EPSILON) * 1000) / 1000;
}

/* export function reverseLatLng(coords: number[][]) {
  let toTurn = [...coords];
  let result: number[][] = [];
  toTurn.forEach((c) => {
    result.push(c);
  });
  result.forEach((r: number[]) => r.reverse());
  return result;
} */

export function calculateCenter(coords: any) {
  const latLng: LatLngExpression = {lat:coords[1],lng:coords[0]};
  return latLng;
}
