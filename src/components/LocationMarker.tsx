import { Icon, LatLngBoundsExpression, LatLngExpression, LatLngLiteral, PointExpression } from 'leaflet';
import React, { useCallback, useEffect, useState } from 'react'
import { Marker, useMap, Popup } from 'react-leaflet';
import { Geolocation, Position } from "@capacitor/geolocation";
//import iconMarker from "leaflet/dist/images/marker-icon.png";

const LocationMarker: React.FC = () => {
    const mapRef = useMap();
    const [position, setPosition] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
    const [gpsPosition, setGpsPosition] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
    const [isLoadingGPS, setIsLoadingGPS] = useState<boolean>(false);
    const [id, setId] = useState("");

    /* const updatePosition = useCallback(() => {
        Geolocation.getCurrentPosition().then((pos: Position) => { return { lat: pos.coords.latitude, lng: pos.coords.longitude } })
            .then((coords: LatLngLiteral) => setPosition(coords));
    }, []); */

    /* function setMarker() {
        getGpsCoords().then((pos) => {
            setPosition(pos);
            if (pos.lat !== 0 && pos.lng !== 0) mapRef.flyTo(pos, 14);
            console.log(pos);
        }).catch(err => console.log(err))
    } */

    /* const renderMyPosition = useCallback(() => {
        getGpsCoords().then((pos) => {
            setPosition(pos);
            if (pos.lat !== 0 && pos.lng !== 0) mapRef.flyTo(pos,14)
        }).catch(err => console.log(err))
    }, [gpsPosition]); */


    const watchMarker = async () => {
        const id = await Geolocation.watchPosition({ enableHighAccuracy: true }, function (position, err): void {
            if (position !== null) {
                const coords = position.coords;
                console.log(coords);
                setPosition({ lat: coords.latitude, lng: coords.longitude });
                mapRef.flyTo({ lat: coords.latitude, lng: coords.longitude }, 14);
            }else console.log(err);
        })
        console.log(position);
        setId(id);
    }

    const clearId = async () => {
        await Geolocation.clearWatch({id:id});
    }

    useEffect(() => {
        watchMarker();
        console.log(position);
        /* renderMyPosition(); */
        return () => {
            setPosition({ lat: 0, lng: 0 });
            clearId();
        }
    }, []);

    function getIcon(iconSize: PointExpression, image: string): Icon {
        return new Icon({
            iconUrl: require("../images/" + image),
            iconSize: iconSize,
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41],
        });
    }

    /* const getIconMarker = new Icon({
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    }); */

    //TODO: implementare per navigazione
    /* function onLocationFound(e) {
  var radius = e.accuracy / 2;
  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();
  L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);
map.locate({setView: true, watch: true, maxZoom: 8}); */

    async function getGpsCoords() {
        let coordsObj: Position = await Geolocation.getCurrentPosition();
        let coords = coordsObj.coords;
        return { lat: coords.latitude, lng: coords.longitude }
    }

    /* async function setLocation() {
        try {
            setPosition(await getGpsCoords());
        } catch (error) {
            console.log(error)
        }
    } */

    return (position.lat === 0 && position.lng === 0) ? null : (
        <Marker position={position} /* icon={getIconMarker} */ icon={getIcon([35, 35], "my-position-marker.svg")} >
            <Popup>
                You are here!. <br />
            </Popup>
        </Marker>
    );
}
export default LocationMarker;