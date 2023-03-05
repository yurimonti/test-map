import { Icon, LatLngBoundsExpression, LatLngExpression, LatLngLiteral, PointExpression } from 'leaflet';
import React, { useCallback, useEffect, useState } from 'react'
import { Marker, useMap, Popup } from 'react-leaflet';
import { CallbackID, ClearWatchOptions, Geolocation, Position } from "@capacitor/geolocation";
import { getMyPositionCoords } from '../api/deviceApi';
//import iconMarker from "leaflet/dist/images/marker-icon.png";

interface Props {
    trigger?: boolean
}
const LocationMarker: React.FC<Props> = ({ trigger }) => {
    const mapRef = useMap();
    const [position, setPosition] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
    const [gpsPosition, setGpsPosition] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
    const [isLoadingGPS, setIsLoadingGPS] = useState<boolean>(false);
    const [id, setId] = useState<any>();

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

    /* watchTrack() {
    this.id = Geolocation.watchPosition({}, (position, err) => {
      this.ngZone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log('location changed===> ','lat: '+this.lat+' lng:'+this.lng);
      });
    });

 stopTrack() {
    console.log('this.wait=',this.id);  
    Geolocation.clearWatch({ id: this.id });
  } */

    const asyncId = {
        setId: async (value: string) => {
            await Promise.resolve();
            setId(value);
        },
        getId: async () => {
            await Promise.resolve();
            return id;
        },
    };

    const watchTrack = async () => {
        const id = await Geolocation.watchPosition({ enableHighAccuracy: true }, (pos, err) => {
            if (pos !== null) {
                const coords = pos.coords;
                console.log(coords);
                if (position.lat !== coords.latitude || position.lng !== coords.longitude) {
                    setGpsPosition({ lat: coords.latitude, lng: coords.longitude });
                    setIsLoadingGPS(true);
                }
                console.log(gpsPosition);
            } else console.log(err);
        });
        console.log("watching=", id);
        setId(id);
    }

    const stopTrack = async () => {
        const toStop = await id;
        console.log('clearing=', toStop);
        const opt: ClearWatchOptions = { id: toStop };
        Geolocation.clearWatch(opt);
    }

    /* const watchPosition = async () => {
        const id: CallbackID = await Geolocation.watchPosition({ enableHighAccuracy: true }, function (pos, err): void {
            if (pos !== null) {
                const coords = pos.coords;
                console.log(coords);
                if (position.lat !== coords.latitude || position.lng !== coords.longitude) {
                    setGpsPosition({ lat: coords.latitude, lng: coords.longitude });
                    setIsLoadingGPS(true);
                }
                console.log(gpsPosition);
            } else console.log(err);
        })
        console.log(position);
        setId(id);
    } */

    const updatePosition = () => {
        setPosition(gpsPosition);
    }

    /* const clearId = async () => {
        return await Geolocation.clearWatch({ id: id });
    } */

    async function setMyPosition() {
        const pos = await getMyPositionCoords();
        setPosition(pos);
        if (!isLoadingGPS) {
            mapRef.flyTo(pos, 16, {
                animate: true, duration: 1.6,
                noMoveStart: true
            });
            setIsLoadingGPS(true);
        } else mapRef.setView(pos, mapRef.getZoom(), {
            animate: true, duration: 1.6,
            noMoveStart: true
        });
        console.log(pos);
    }

    useEffect(() => {
        stopTrack();
        watchTrack();
        setMyPosition();
        updatePosition();
        /* watchMarker(); */
        console.log(position);
        /* renderMyPosition(); */
        return () => {
            stopTrack();
            setIsLoadingGPS(false);
        }
    }, [gpsPosition]);

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