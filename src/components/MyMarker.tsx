import React, { useRef } from 'react'
import { POI } from '../MyTypes/types';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { IonButton, IonIcon, IonText } from '@ionic/react';
import { timeOutline } from 'ionicons/icons'
import IconToCategory from './IconToCategory';
import { useHistory } from 'react-router';
interface PopUpEffect {
    name?: string,
    action?: () => void
}

interface Props {
    poi: POI,
    popup?: boolean,
    icon?: any,
    isPoiIcon?: boolean,
    popUpEffect: PopUpEffect
}


const MyMarker: React.FC<Props> = ({ poi, popup, icon, isPoiIcon, popUpEffect }) => {
    const history = useHistory();
    const buttonRef = useRef<any>();

    const info = {
        title: poi.name.length > 60 ? poi.name.slice(0, 60) + "..." : poi.name,
        subtitle: poi.description,
        isOpen: poi?.hours?.isOpen,
        visit: poi.timeToVisit,
        price: poi.ticketPrice,
        types: poi.types,
        address: poi?.address?.street + " " + poi?.address?.number,
        email: poi?.contact?.email,
        fax: poi?.contact?.fax,
        phone: poi?.contact?.cellNumber,
    };

    function printTypes(poi: POI) {
        let result = "";
        poi.types.forEach((t) => {
            result += t.name + " ";
        });
        return result;
    }

    function renderInfoOfAPoi(poi: POI) {
        return (
            <>
                <div className="text-center text-sm mx-2">
                    <h1 className="font-semibold text-lg">{info.title}</h1>
                    <>
                        {poi.types[0].categories.map(c => { return <IconToCategory category={c.name} height={6} width={6} /> })}
                        <h4 className="ml-1 font-sans text-base " >{printTypes(poi)}</h4></>
                    <h4 className="font-sans" >{info.address}</h4>
                    {info.price !== 0 && info.price !== null && (
                        <h4 className="font-sans" >{"prezzo: " + info.price}</h4>
                    )}
                    <h4 className="font-sans" >
                        <IonIcon icon={timeOutline} size="small" color='tertiary' className='align-middle' />
                        {"Visita: " + info.visit} min
                    </h4>
                    <h4
                        className={
                            info.isOpen
                                ? "font-sans text-green-600"
                                : "font-sans text-red-600"
                        }
                    >
                        {info.isOpen ? "APERTO" : "CHIUSO"}
                    </h4>
                </div>
                <div className='flex justify-between'>
                    <IonButton fill='outline' color={'danger'} size='small' shape='round' slot='start'
                        /* className="border-2 font-sans px-4 rounded-xl m-auto p-1 border-red-500" */
                        onClick={() => {
                            history.push('/pois/' + poi.id);
                        }}
                    >
                        <IonText><p className='text-center text-xs px-4' >Info</p></IonText>
                    </IonButton>
                    <IonButton
                        onClick={popUpEffect.action}
                        fill='outline' color={'secondary'} size='small' shape='round' slot='end'
                    /* className="font-sans border-2 rounded-md m-auto p-1 border-sky-500  hover:bg-sky-500 bg-sky-400 block float-right" */
                    /* className="transition ease-in-out delay-10 sm:hover:shadow-md sm:hover:scale-105 sm:hover:shadow-sky-300 duration-250 border-2 font-sans rounded-xl m-auto p-1 border-sky-400 block float-right" */
                    >
                        <IonText><p className='text-center text-xs' >{popUpEffect?.name}</p></IonText>
                    </IonButton>
                </div>
            </>
        );
    }

    function getIcon(iconSize: any, image: string) {
        return new Icon({
            iconUrl: require("../images/" + image),
            iconSize: iconSize,
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41],
        });
    }


    const getStandardIcon = () => {
        return new Icon({
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });
    }
    /* new Icon({
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    }); */


    function adjustIcon(poi: POI) {
        let typesPoi = poi.types.map((t) => {
            return t.name;
        });
        let result: Icon;
        switch (typesPoi[0]) {
            case "Basilica":
            case "Chiesa":
            case "Monastero":
            case "Cattedrale":
            case "Santuario":
            case "Tempio":
                result = getIcon([40, 40], "spiritual-marker.svg");
                break;
            case "Lago":
                result = getIcon([40, 40], "lake-marker.svg");
                break;
            case "Bosco":
            case "Giardino":
            case "Parco":
            case "Parco Giochi":
            case "Mulino":
                result = getIcon([40, 40], "natural-marker.svg");
                break;
            case "Biblioteca":
            case "Teatro":
            case "Statua":
            case "Museo":
                result = getIcon([40, 40], "cultural-marker.svg");
                break;
            case "Palazzo":
            case "Monumento":
            case "Piazza":
            case "Rocca":
                result = getIcon([40, 40], "architectural-marker.svg");
                break;
            case "Fontanella":
                result = getIcon([40, 40], "drinking-fountain-marker.svg");
                break;
            case "Ristorante":
            case "Enoteca":
                result = getIcon([40, 40], "ristorazione.svg");
                break;
            case "Sosta Macchine":
            case "Sosta Camper":
                result = getIcon([40, 40], "services.svg");
                break;
            default:
                result = getStandardIcon();
                break;
        }
        return result;
    }

    return (
        <>
            <Marker
                position={[poi.coordinate.lat, poi.coordinate.lon]}
                icon={isPoiIcon ? adjustIcon(poi) : getStandardIcon()}
            >
                {popup && (
                    <Popup maxWidth={300} minWidth={180}>
                        {renderInfoOfAPoi(poi)}
                    </Popup>
                )}
            </Marker>
        </>
    )
}

export default MyMarker