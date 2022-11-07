import "./MapPage.css";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from "@ionic/react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import LocationMarker from "../components/LocationMarker";

const MapPage: React.FC = () => {
  const [renderMap, setRenderMap] = useState(false);

  useEffect(() => {
    setTimeout(() => setRenderMap(true), 20);
    return()=>{
      setRenderMap(false);
    }
  }, [])

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
          <LocationMarker />
        </MapContainer>}
      </IonContent>
    </IonPage>
  );
};

export default MapPage;