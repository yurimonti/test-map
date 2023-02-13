import "./MapPage.css";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from "@ionic/react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import LocationMarker from "../components/LocationMarker";
import { privateInstance } from "../api/axiosInstance";
import { Coordinate, POI } from "../MyTypes/types";
import { Icon, LatLngLiteral, marker, circle } from "leaflet";

const MapPage: React.FC = () => {
  const [renderMap, setRenderMap] = useState(false);
  //const [pois,setPois] = useState<POI[]>([])

  const getIconMarker = new Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  /* function fillPois() {
    privateInstance
      .get("/user/pois")
      .then((res) => {
        setPois(res.data);
      })
      .catch((res) => {
        console.log(res.status);
      });
  } */

  function coordToLitteral(coord: Coordinate): LatLngLiteral {
    let lat = coord.lat;
    let lng = coord.lon;
    return { lat, lng };
  }

  useEffect(() => {
    setTimeout(() => setRenderMap(true), 20);
    //fillPois();
    return () => {
      setRenderMap(false);
      //setPois([]);
    }
  }, [])

  /* const UpdateLocation = () => {
    const map = useMap();

    function onLocationFound(e: any) {
      var radius = e.accuracy / 2;
      marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
      circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);
    map.locate({ setView: true, watch: true, maxZoom: 8 });
    return null;
  } */

  /* const MyComponent = () => {
    const map = useMapEvents({
      click: () => {
        map.locate({ setView: true, watch: true, maxZoom: 8 })
      },
      locationfound: (location) => {
        var radius = location.accuracy / 2;
        marker(location.latlng).addTo(map)
          .bindPopup("You are within " + radius + " meters from this point").openPopup();
      },
    })
    return null
  } */
  /* function renderMarker(){
    return(
      pois.map((poi:POI) => {
        return (
          <Marker
            key={poi.id}
            position={coordToLitteral(poi.coordinate)}
            icon={getIconMarker}
          />
        );
      })
    )
  } */

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {renderMap && <MapContainer center={[43.4136837335567, 12.026927671986703]} zoom={8} scrollWheelZoom={true}>
          <TileLayer
            attribution={"https://www.openstreetmap.org/copyright"}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* {renderMarker()} */}
          <LocationMarker />
        </MapContainer>}
      </IonContent>
    </IonPage>
  );
};

export default MapPage;