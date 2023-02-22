import { RouteComponentProps } from "react-router";

interface NavigateProps extends RouteComponentProps<{}> {}

interface AddressType {
  id: number;
  street: string;
  number: number;
}

interface TimeSlot {
  id: number;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
  isOpen: boolean;
}

interface Tag {
  id: number;
  name: string;
  isBooleanType: boolean;
}

interface PoiTagRel {
  id: number | null;
  tag: Tag;
  booleanValue: boolean | null;
  stringValue: string | null;
}

interface PoiType {
  id: number;
  name: string;
  categories: CategoryType[];
  tags: Tag[];
}

interface CategoryType {
  id: number;
  name: string;
}

interface Contact {
  id: number;
  email: string;
  cellNumber: string;
  fax: string;
}

interface ItRelPoi {
  id: number;
  poi: POI;
  index: number;
}

interface ItineraryRequest {
  id: number;
  name: string;
  description: string;
  points: ItRelPoi[];
  categories: CategoryType[];
  cities: City[];
  accepted: boolean | null;
  consensus: number;
  createdBy: string;
  timeToVisit: number;
  geoJsonList: string[];
}

interface Itinerary {
  id: number;
  name: string;
  description: string;
  points: ItRelPoi[];
  categories: CategoryType[];
  cities: City[];
  isDefault: boolean;
  consensus: number;
  createdBy: string;
  timeToVisit: number;
  geoJsonList: string[];
}

interface City {
  id: number;
  identifiers: number[];
  name: string;
  coordinates: Coordinate;
  pois: POI[];
  itineraries: Itinerary[];
}

interface PoiRequest {
  id: number;
  status: string;
  name: string;
  description: string;
  coordinate: Coordinate;
  hours: TimeSlot;
  timeToVisit: number;
  address: AddressType;
  ticketPrice: number;
  username: string;
  poi: POI | null;
  types: PoiType[];
  contact: Contact;
  tagValues: PoiTagRel[];
}

interface UserCredentials {
  username: string;
  password: string;
}

interface Coordinate {
  id: number;
  lat: number;
  lon: number;
}

interface POI {
  id: number;
  name: string;
  description: string;
  coordinate: Coordinate;
  hours: TimeSlot;
  timeToVisit: number;
  address: AddressType;
  ticketPrice: number;
  city: City;
  contributors: string[];
  types: PoiType[];
  contact: Contact;
  tagValues: PoiTagRel[];
}

export const MY_IP: string = "192.168.178.38";

// 👇️ named export
export type {
  POI,
  Coordinate,
  PoiRequest,
  NavigateProps,
  UserCredentials,
  AddressType,
  CategoryType,
  City,
  Contact,
  ItRelPoi,
  Itinerary,
  ItineraryRequest,
  PoiTagRel,
  PoiType,
  Tag,
  TimeSlot,
};
