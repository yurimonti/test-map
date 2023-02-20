import { privateRequest, makePublicRequest } from "./capacitorApi";
import { getReverseGeo } from "./geocodingService";

const baseUrl = "/tourist";

async function getPois() {
  return await privateRequest({ url: "/pois", method: "get" });
}

async function createNewPoiRequest(payload: any, id: number) {
  return await privateRequest({
    url: baseUrl + "/poi-requests",
    method: "post",
    payload: payload,
    params: { cityId: id.toString() },
  });
}

async function createModifyPoiRequest(payload: any) {
  return await privateRequest({
    url: baseUrl + "/poi-requests",
    method: "post",
    payload: payload,
    params: { cityId: "0" },
  });
}

async function getTouristpoiRequests() {
  return await privateRequest({
    url: baseUrl + "/poi-requests",
    method: "get",
  });
}

async function deleteTouristPoiRequest(id: number) {
  return await privateRequest({
    url: baseUrl + "/poi-requests/" + id.toString(),
    method: "delete",
  });
}

async function getItineraryFromCity(id: number) {
  return await privateRequest({
    url: baseUrl + "/city/" + id.toString() + "/itineraries",
    method: "get",
  });
}

async function deleteTouristItinerary(id: number) {
  return await privateRequest({
    url: baseUrl + "/itinerary/" + id.toString(),
    method: "delete",
  });
}

async function createItinerary(payload: any) {
  return await privateRequest({
    url: baseUrl + "/itinerary",
    method: "post",
    payload: payload,
  });
}

async function getItineraries() {
  return await privateRequest({ url: baseUrl + "/itinerary", method: "get" });
}

async function proposeTouristItinerary(id: number) {
  return await privateRequest({
    url: baseUrl + "/itinerary/" + id.toString(),
    method: "post",
  });
}

async function loginUser(payload: any) {
  return await makePublicRequest({
    url: "/auth/login",
    payload: payload,
    method: "post",
  });
}

async function logoutUser(payload: any) {
  return await makePublicRequest({
    url: "/auth/logout",
    payload: payload,
    method: "post",
  });
}
async function signUpUser(payload: any) {
  return await makePublicRequest({
    url: "/auth/registration",
    payload: payload,
    method: "post",
  });
}

async function getAllCategories() {
  return await privateRequest({ url: "/user/categories", method: "get" });
}

async function getAllTypes(payload: any) {
  return await privateRequest({
    url: "/user/poiTypes",
    method: "post",
    payload: payload,
  });
}

async function getPoi(id: number) {
  return await privateRequest({
    url: "/user/pois/" + id.toString(),
    method: "get",
  });
}

async function getAllCities() {
  return await privateRequest({ url: "/user/city", method: "get" });
}

async function getIdentifiersByCoords(coordinates:any):Promise<any> {
  const geocode = await getReverseGeo({lat:coordinates.lat,lon:coordinates.lon});
  return geocode?.features[0]?.properties?.id;
}

export {
  createModifyPoiRequest,
  createNewPoiRequest,
  getTouristpoiRequests,
  deleteTouristPoiRequest,
  getItineraryFromCity,
  getItineraries,
  deleteTouristItinerary,
  createItinerary,
  proposeTouristItinerary,
  loginUser,
  logoutUser,
  signUpUser,
  getPois,
  getAllCategories,
  getAllTypes,
  getPoi,
  getAllCities,
  getIdentifiersByCoords
};
