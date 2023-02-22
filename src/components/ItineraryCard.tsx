import { FC, useState } from 'react'
import LoadingComponent from './LoadingComponent';
import MyModal from './MyModal';
import ModalComponent from './ModalComponent';
import { ItRelPoi, Itinerary, POI } from '../utility/types';
import { useHistory } from 'react-router';
import { mToKmRounded } from '../utility/functionUtility';
import { deleteTouristItinerary, proposeTouristItinerary } from '../api/touristApi';

interface Props {
    itinerary: Itinerary,
    reloadAction: (p: any) => void
}

const errorAlertMessage = {
    title: "ERRORE",
    content: "Errore nella richiesta ",
    result: "Indietro"
};

const ItineraryCard: FC<Props> = ({ itinerary, reloadAction }) => {
    const history = useHistory();
    const [alertTrigger, setAlertTrigger] = useState(false);
    const [modalTrigger, setModalTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertState, setAlertState] = useState({
        messages: errorAlertMessage,
        close: () => {
            setAlertTrigger(false);
            reloadAction((p: boolean) => { return !p });
        }
    });

    async function deleteItinerary() {
        setIsLoading(true);
        try {
            await deleteTouristItinerary(itinerary.id);
            setAlertState(prev => {
                return {
                    ...prev, messages: {
                        title: "SUCCESSO",
                        content: "Itinerario eliminato correttamente",
                        result: "OK"
                    }
                }
            })
        } catch (err) {
            console.log(err);
            setAlertState(prev => {
                return { ...prev, messages: errorAlertMessage }
            })
        } finally {
            setIsLoading(false);
            setAlertTrigger(true);
        }
    }

    function proposeItinerary() {
        proposeTouristItinerary(itinerary.id)
            .then(res => {
                console.log(res);
                setAlertState(prev => {
                    return {
                        ...prev, messages: {
                            title: "Richiesta Effettuata",
                            content: "Itineriario proposto",
                            result: "Indietro"
                        }
                    }
                });
            })
            .catch(err => {
                console.log(err);
                setAlertState(prev => {
                    return { ...prev, messages: errorAlertMessage }
                })
            })
            .finally(() => {
                setAlertTrigger(true);
            })
    }

    return isLoading ? <LoadingComponent /> :(
        <div
            key={itinerary.id}
            className="min-w-fit group bg-white relative p-2 border-4 rounded-xl border-blue-400 hover:border-blue-500 focus:border-blue-500 shadow-blue-300 shadow-md transition ease-in-out delay-10 duration-400 hover:shadow-lg hover:shadow-blue-300"
        >
            <h2 className="text-center text-lg leading-8 text-gray-900">
                <p className="font-sans tracking-tighter" onClick={() => { itinerary.points.map((p:ItRelPoi) => p.poi).forEach((p:POI)=> console.log(p.types));
                    setModalTrigger(true) }}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {itinerary.name === null
                        ? "Itinerario"
                        : itinerary?.name.length > 30
                            ? itinerary?.name.slice(0, 30) + "..."
                            : itinerary?.name}
                </p>
            </h2>
            <div className="mt-4 flex justify-between">
                <div>
                    {itinerary.cities.length > 0 ?
                        <h3 className="text-sm font-sans">
                            Città:
                            <p className="mt-1 text-gray-500">
                                {itinerary?.cities?.map((c) => {
                                    return <li key={c.id}>{c.name}</li>;
                                })}
                            </p>
                        </h3> :
                        <h3 className="text-sm font-sans"> Descrizione:
                            <p className="mt-1 text-gray-500">
                                {itinerary?.description.slice(0, 50) + "..."}
                            </p>
                        </h3>}
                    <h3 className="text-sm font-sans">
                        Categorie:
                        <p className="mt-1 text-gray-500">
                            {itinerary.categories.map((c) => {
                                return <li key={c.id}>{c.name}</li>;
                            })}
                        </p>
                    </h3>
                </div>
                <div>
                    <h3 className="text-sm font-sans">
                        Durata:{" "}
                        {itinerary.geoJsonList.length !== 0 && (
                            <p className="text-gray-500">
                                {Math.round(
                                    (itinerary.timeToVisit +
                                        JSON.parse(itinerary.geoJsonList[0]).features[0].properties
                                            .summary.duration) /
                                    60
                                )}{" "}
                                minuti
                            </p>
                        )}
                    </h3>
                    <h3 className="text-sm font-sans">
                        Distanza:
                        {itinerary.geoJsonList.length !== 0 && (
                            <p className="text-gray-500">
                                {mToKmRounded(
                                    JSON.parse(itinerary.geoJsonList[0]).features[0].properties
                                        .summary.distance
                                )}{" "}
                                km
                            </p>
                        )}
                    </h3>
                </div>
            </div>
            <ModalComponent
                key={itinerary.id}
                open={modalTrigger}
                onClose={() => {
                    setModalTrigger(false);
                }}
                accept={
                    itinerary?.isDefault ? undefined :
                        {
                            title: "proponi itinerario",
                            action: () => {
                                proposeItinerary();
                                setModalTrigger(false);
                            },
                        }}
                deny={
                    itinerary?.isDefault
                        ? undefined
                        : {
                            title: "elimina itinerario",
                            action: () => {
                                deleteItinerary();
                                setModalTrigger(false);
                            },
                        }
                }
                title={itinerary.name}
                modify={{
                    title: "vedi info",
                    action: () => {
                        history.push("/itineraries/" + itinerary.id);
                    },
                }}
            >
                <h2 className="text-lg font-sans text-gray-900">
                    Che cosa vuoi fare?
                </h2>
            </ModalComponent>
            <MyModal
                onClose={alertState.close}
                messages={alertState.messages}
                show={alertTrigger}
            />
        </div>
    );
}

export default ItineraryCard