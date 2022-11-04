import { Icon, LatLngLiteral, LocationEvent } from 'leaflet';
import React, { useEffect, useState } from 'react'
import { Marker, useMap, Popup } from 'react-leaflet';
import { Geolocation, Position } from "@capacitor/geolocation";
//import iconMarker from "leaflet/dist/images/marker-icon.png";

const LocationMarker: React.FC = () => {
    const mapRef = useMap();
    const [position, setPosition] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
    useEffect(() => {
        setLocation();
    }, [mapRef])

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

    function setLocation() {
        Geolocation.getCurrentPosition().then((data: Position) => { return { lat: data.coords.latitude, lng: data.coords.longitude } }).then((coords: LatLngLiteral) => {
            setPosition(coords);
            mapRef.flyTo(coords,14);
        }).catch(err =>{
            console.log(err);
            alert(err+"");
        });
    }

    return (position.lat===0&&position.lng===0) ? null : (
        <Marker position={position} icon={getIconMarker}>
            <Popup>
                You are here!. <br />
            </Popup>
        </Marker>
    );
}
export default LocationMarker;