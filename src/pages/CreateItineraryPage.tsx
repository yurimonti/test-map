import { FC, useState, useEffect } from 'react'
import { POI } from '../utility/types';
import AddedPoiComponents from '../components/AddedPoiComponents';
import MyHeader from '../components/MyHeader';
import { MapContainer, TileLayer } from 'react-leaflet';
import "./CreateItineraryPage.css";
import MyMarker from '../components/MyMarker';
import { createGeoJsonList, createItinerary, getPois } from '../api/touristApi';
import ModalComponent from '../components/ModalComponent';
import { useHistory } from 'react-router';

const errorAlertMessage = {
    title: "ERRORE",
    content: "Errore nella richiesta ",
    result: "Indietro"
};


const CreateItineraryPage: FC = () => {
    const [addedPois, setAddedPois] = useState<POI[]>([]);
    const [pois, setPois] = useState<POI[]>([]);
    const [renderMap, setRenderMap] = useState(false);
    const [reload, setReload] = useState<boolean>(false);
    const [triggerModal, setTriggerModal] = useState<boolean>(false);
    const [alertTrigger, setAlertTrigger] = useState<boolean>(false);
    const [center, setCenter] = useState([])
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [alertData, setAlertData] = useState({
        messages: errorAlertMessage, close: () => {
            setAlertTrigger(false);
            setReload((p: boolean) => { return !p });
        }
    })
    const [itineraryData, setItineraryData] = useState({
        name: "",
        description: ""
    })
    const count = addedPois.length;

    function renderMarkers() {
        return (pois.map((poi) => {
            return (
                <MyMarker
                    popUpEffect={{
                        name: "Aggiungi",
                        action: () => {
                            setAddedPois((prev: POI[]) => {
                                return [...prev, poi];
                            })
                        },
                    }}
                    key={poi.id}
                    isPoiIcon={true}
                    poi={poi}
                    popup={true}
                />
            );
        }));
    }

    function createNewItinerary() {
        setIsLoading(true);
        createGeoJsonList(addedPois)
            .then((data) => {
                console.log(data.map(g => JSON.stringify(g)));
                createItinerary({
                    poisId: addedPois.map(p => p.id),
                    geoJsonList: data.map((geo: any) => JSON.stringify(geo)),
                    name: itineraryData.name,
                    description: itineraryData.description,
                })
                    .then(res => {
                        console.log(res);
                        setAlertData({
                            close: () => {
                                setAlertTrigger(false);
                                history.replace('/itineraries');
                            }, messages: {
                                title: "SUCCESSO",
                                content: "Itinerario creato con successo",
                                result: "OK"
                            }
                        }
                        )
                    })
                    .catch(err => {
                        console.log(err);
                        setAlertData(prev => {
                            return { ...prev, messages: errorAlertMessage }
                        });
                    })
                    .finally(() => {
                        setIsLoading(false);
                        setAlertTrigger(true);
                    })
            })
            .catch(err => {
                console.log(err);
                setAlertData(prev => {
                    return { ...prev, messages: errorAlertMessage }
                })
                setIsLoading(false);
                setAlertTrigger(true);
            })
    }

    async function fillPois() {
        try {
            const pois = await getPois();
            console.log(pois.data);
            setPois(pois.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setTimeout(() => setRenderMap(true), 20);
        fillPois();
        console.log(pois);
        return () => {
            setRenderMap(false);
            setPois([]);
        }
    }, [])

    const render = ()=>{
        let result = false;
        if(!triggerModal){
            if(count > 0) result = true;
        }
        return result;
    }


    return (
        <MyHeader backButton title='Nuovo Itinerario' >
            {render() && <div className='fixed z-20 ml-6 bottom-10 left-auto text-white rounded-full p-2'>
                <AddedPoiComponents pois={addedPois} addPois={setAddedPois} label={count} onComplete={() => {
                    count > 1 && setTriggerModal(true)
                }} />
            </div>}
            {renderMap && <MapContainer center={[43.4136837335567, 12.026927671986703]} zoom={8} scrollWheelZoom={true}>
                <TileLayer
                    attribution={"https://www.openstreetmap.org/copyright"}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {renderMarkers()}
            </MapContainer>}
            <ModalComponent
                open={triggerModal}
                onClose={() => {
                    setTriggerModal(false);
                }}
                accept={
                    itineraryData.name !== "" && itineraryData.description !== ""
                        ? {
                            title: "conferma itinerario",
                            action: () => {
                                setTriggerModal(false);
                                createNewItinerary();
                            },
                        }
                        : undefined
                }
                title="Conferma?"
            >
                <input
                    className="block"
                    name="name"
                    type="text"
                    placeholder="Inserire Nome Itinerario ..."
                    value={itineraryData.name}
                    onChange={(e) => {
                        setItineraryData((prev) => {
                            return { ...prev, name: e.target.value };
                        });
                    }}
                />
                <textarea
                    className="block"
                    name="description"
                    placeholder="Inserire Descrizione Itinerario ..."
                    value={itineraryData.description}
                    onChange={(e) => {
                        setItineraryData((prev) => {
                            return { ...prev, description: e.target.value };
                        });
                    }}
                />
            </ModalComponent>
        </MyHeader>
    )
}

export default CreateItineraryPage