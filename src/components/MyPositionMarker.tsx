import { Icon, LatLngLiteral, PointExpression } from 'leaflet';
import { FC, useState, useEffect, useCallback } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet';
import { getMyPositionCoords } from '../api/deviceApi';
import { ClearWatchOptions, Geolocation } from "@capacitor/geolocation";

interface Props {
    trigger?: boolean,
    setTrigger?:any
}

const MyPositionMarker: FC<Props> = ({ trigger,setTrigger }) => {
    const mapRef = useMap();
    const [position, setPosition] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
    const [gpsPosition, setGpsPosition] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
    const [isLoadingGPS, setIsLoadingGPS] = useState<boolean>(false);
    const [id, setId] = useState<any>();

    const watchTrack = () => {
        const id = Geolocation.watchPosition({ enableHighAccuracy: true }, (pos, err) => {
            if (pos !== null) {
                const coords = pos.coords;
                console.log(coords);
                if (position.lat !== coords.latitude || position.lng !== coords.longitude) {
                    setGpsPosition({ lat: coords.latitude, lng: coords.longitude });
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

    const setCenteredView = useCallback(
        async () => {
            const pos = await getMyPositionCoords();
            console.log('position triggered: ',pos);
            mapRef.setView(pos, mapRef.getZoom(), {
                animate: true, duration: 1.6,
                noMoveStart: true
            });
            setPosition(pos);
        },
        [trigger],
    )


    async function setMyPosition() {
        const pos = await getMyPositionCoords();
        setPosition(pos);
        mapRef.flyTo(pos, 16, {
            animate: true, duration: 1.6,
            noMoveStart: true
        });
    }

    useEffect(() => {
        stopTrack();
        watchTrack();
        setMyPosition();
        setPosition(gpsPosition);
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

    return (position.lat === 0 && position.lng === 0) ? null : (
        <Marker position={position} /* icon={getIconMarker} */ icon={getIcon([35, 35], "my-position-marker.svg")} >
            <Popup>
                You are here!. <br />
            </Popup>
        </Marker>
    );
}

export default MyPositionMarker