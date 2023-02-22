import { useState, useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import MyHeader from '../components/MyHeader';
import { MapContainer, Marker, TileLayer, GeoJSON } from 'react-leaflet';
import LocationMarker from '../components/LocationMarker';
import { calculateCenter } from '../utility/functionUtility';
import { Icon } from 'leaflet';

const ExecItineraryPage: FC = () => {
    const [renderMap, setRenderMap] = useState(false);
    const { state } = useLocation<any>();

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

    function renderMarkerData() {
        return state?.data?.metadata?.query?.coordinates.map((c: any) => {
            return <Marker key={c} position={[c[1], c[0]]} icon={getIconMarker} />;
        });
    }

    function renderData() {
        if (state?.data) {
            return (
                <>
                    <GeoJSON data={state?.data} />
                    {renderMarkerData()}
                </>
            );
        }
    }

    useEffect(() => {
        setTimeout(() => setRenderMap(true), 20);
        return () => {
            setRenderMap(false);
        }
    }, [])

    return (
        <MyHeader title='Esecuzione' backButton>
            {renderMap && <MapContainer center={calculateCenter(
                state?.data?.metadata?.query?.coordinates[0]
            )} zoom={8} scrollWheelZoom={true}>
                <TileLayer
                    attribution={"https://www.openstreetmap.org/copyright"}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {renderMap && renderData()}
                <LocationMarker />
            </MapContainer>}
        </MyHeader>
    )
}

export default ExecItineraryPage