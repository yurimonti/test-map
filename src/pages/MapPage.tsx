import "./MapPage.css";
import { MapContainer, Marker, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import LocationMarker from "../components/LocationMarker";
import { Coordinate, POI } from "../MyTypes/types";
import { Icon, LatLngExpression, LatLngLiteral } from "leaflet";
import MyHeader from "../components/MyHeader";
import MyMarker from "../components/MyMarker";
import { getPois } from "../api/touristApi";
import { HttpResponse } from "@capacitor/core";
import { useHistory } from "react-router";
import { makePrivateRequest, makePublicRequest, privateRequest } from "../api/capacitorApi";

interface Props {
  data?: any,
  zoom?: number,
  renderAll: boolean,
  center?: LatLngExpression
}

const MapPage: React.FC<Props> = ({ data, renderAll, zoom, center }) => {
  const [renderMap, setRenderMap] = useState(false);
  const [pois, setPois] = useState<POI[]>([]);
  const history = useHistory();

  async function fillPois() {
    try {
      const pois = await privateRequest({ url: "/pois", method: "get" });
      setPois(pois.data);
    } catch (err) {
      console.log(err);
    }

    /* makePublicRequest({
      url: "/auth/real_refresh",
      method: "post",
      payload: { refresh_token: localStorage.getItem('refresh_token') },
    })
      .then((res: any) => {
        let result = res.data;
        makePrivateRequest({ url: "/pois", method: "get" }, result.access_token)
          .then((res: any) => {
            setPois(res.data);
          })
          .catch((res) => {
            console.log(res.status);
          });
          console.log(result);
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("refresh_token", result.refresh_token);
      })
      .catch((err) => {
        console.log(err);
      }); */
  }

  function renderMarkerData() {
    return data?.metadata?.query?.coordinates.map((c: any) => {
      return <Marker key={c} position={[c[1], c[0]]} />;
    });
  }

  function renderMarkers() {
    return (
      renderAll &&
      pois.map((poi) => {
        return (
          <MyMarker
            popUpEffect={{
              name: "Modifica",
              action: () => {
                history.push("/poi-form/poi/" + poi.id, { poi: true });
              },
            }}
            key={poi.id}
            isPoiIcon={true}
            poi={poi}
            popup={true}
          />
        );
      })
    );
  }

  function renderData() {
    if (data) {
      return (
        <>
          <GeoJSON data={data} />
          {renderMarkerData()}
        </>
      );
    }
  }

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

  /*   function coordToLitteral(coord: Coordinate): LatLngLiteral {
      let lat = coord.lat;
      let lng = coord.lon;
      return { lat, lng };
    } */

  useEffect(() => {
    setTimeout(() => setRenderMap(true), 20);
    fillPois();
    console.log(pois);
    return () => {
      setRenderMap(false);
      setPois([]);

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
    <MyHeader title='Mappa' backButton>
      {renderMap && <MapContainer center={[43.4136837335567, 12.026927671986703]} zoom={8} scrollWheelZoom={true}>
        <TileLayer
          attribution={"https://www.openstreetmap.org/copyright"}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMap && renderData()}
        {renderMap && renderMarkers()}
        <LocationMarker />
      </MapContainer>}
    </MyHeader>
  );
};

export default MapPage;