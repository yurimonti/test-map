import { FC, useState, useEffect } from 'react'
import LoadingComponent from '../components/LoadingComponent';
import { mToKmRounded } from '../utility/functionUtility';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getItinerary } from '../api/touristApi';
import CarIcon from '../components/icon-components/CarIcon';
import WheelChairIcon from '../components/icon-components/WheelChairIcon';
import CyclingElectricIcon from '../components/icon-components/CyclingElectricIcon';
import WalkingIcon from '../components/icon-components/WalkingIcon';
import { Itinerary } from '../utility/types';
import IconToCategory from '../components/IconToCategory';
import InstructionsComponent from '../components/InstructionsComponent';
import MyHeader from '../components/MyHeader';
import './ItineraryDescriptionPage.css';
import { IonIcon } from '@ionic/react';
import { playCircleSharp } from 'ionicons/icons'

const initialValuesButton = [true, false, false, false];

interface CurrentGeoJson {
    name: string,
    data: any,
}

const ItineraryDescriptionPage: FC = () => {

    const { id } = useParams<any>();
    const [data, setData] = useState<Itinerary>();
    const { state } = useLocation<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [currentGeoJson, setCurrentGeoJson] = useState<CurrentGeoJson>();
    const [geoJsonSelect, setGeoJsonSelect] = useState<any>([]);
    const [buttons, setButtons] = useState<boolean[]>(initialValuesButton);
    const history = useHistory();

    const switchButton = (profile: string) => {
        let result: boolean[];
        switch (profile) {
            case 'driving-car': result = [true, false, false, false];
                break;
            case 'wheelchair': result = [false, true, false, false];
                break;
            case 'cycling-electric': result = [false, false, true, false];
                break;
            case 'foot-walking': result = [false, false, false, true];
                break;
            default: result = [true, false, false, false];
                break;
        }
        return result;
    }

    async function getData() {
        setIsLoading(true);
        try {
            const response = await getItinerary(id);
            const data = response.data;
            setData(data);
            const parsedData = data.geoJsonList.map((geo: any) => JSON.parse(geo));
            console.log('parsed', parsedData);
            const firstButtonName = parsedData[0].metadata.query.profile;
            setButtons(switchButton(firstButtonName));
            setGeoJsonSelect(
                parsedData.map((r: any) => {
                    console.log(r.metadata.query.profile);
                    return { name: r.metadata.query.profile, data: r };
                })
            );
            setCurrentGeoJson({
                name: firstButtonName,
                data: parsedData[0],
            });
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    function isDisabled(profile: string) {
        return geoJsonSelect.map((g: CurrentGeoJson) => g.name).includes(profile) ? false : true;
    }

    useEffect(() => {
        getData();
        return () => {
            setData(undefined);
            setGeoJsonSelect([]);
            setCurrentGeoJson(undefined);
            setButtons(initialValuesButton);
        }
    }, [id])

    return (
        <MyHeader backButton title='Descrizione' >
            {isLoading ? <LoadingComponent /> :
                <>
                    <div className='flex justify-between align-middle mx-8' >
                        <div className="w-fit my-3">
                            <button
                                type="button"
                                disabled={isDisabled("driving-car")}
                                className={
                                    buttons[0]
                                        ? "m-1 rounded-full ring-4  ring-indigo-600"
                                        : "m-1 rounded-full ring-4  ring-indigo-200 transition ease-in-out delay-10 sm:hover:shadow-xl sm:hover:ring-indigo-600 sm:hover:shadow-indigo-500 duration-800"
                                }
                                onClick={() => {
                                    if (!buttons[0]) {
                                        setButtons([true, false, false, false]);
                                        if (!isDisabled("driving-car")) {
                                            let toSet = geoJsonSelect.filter(
                                                (g: CurrentGeoJson) => g.name === "driving-car"
                                            )[0];
                                            setCurrentGeoJson(toSet);
                                        }
                                    }
                                }}
                            >
                                <CarIcon /*color="#4F46E5"*/ color="#4F46E5" thickness="24" />
                            </button>
                            <button
                                type="button"
                                disabled={isDisabled("wheelchair")}
                                className={
                                    buttons[1]
                                        ? "m-1 rounded-full ring-4  ring-indigo-600"
                                        : "m-1 rounded-full ring-4  ring-indigo-200 transition ease-in-out delay-10 hover:shadow-xl hover:ring-indigo-600 hover:shadow-indigo-500 duration-250"
                                }
                                onClick={() => {
                                    if (!buttons[1]) {
                                        setButtons([false, true, false, false]);
                                        if (!isDisabled("wheelchair")) {
                                            let toSet = geoJsonSelect.filter(
                                                (g: CurrentGeoJson) => g.name === "wheelchair"
                                            )[0];
                                            setCurrentGeoJson(toSet);
                                        }
                                    }
                                }}
                            >
                                <WheelChairIcon /*color="#4F46E5"*/ color="#4F46E5" thickness="16" />
                            </button>
                            <button
                                type="button"
                                disabled={isDisabled("cycling-electric")}
                                className={
                                    buttons[2]
                                        ? "m-1 rounded-full ring-4  ring-indigo-600"
                                        : "m-1 rounded-full ring-4  ring-indigo-200 transition ease-in-out delay-10 hover:shadow-xl hover:ring-indigo-600 hover:shadow-indigo-500 duration-250"
                                }
                                onClick={() => {
                                    if (!buttons[2]) {
                                        setButtons([false, false, true, false]);
                                        if (!isDisabled("cycling-electric")) {
                                            let toSet = geoJsonSelect.filter(
                                                (g: CurrentGeoJson) => g.name === "cycling-electric"
                                            )[0];
                                            setCurrentGeoJson(toSet);
                                        }
                                    }
                                }}
                            >
                                <CyclingElectricIcon
              /*color="#4F46E5"*/ color="#4F46E5"
                                    thickness="22"
                                />
                            </button>
                            <button
                                type="button"
                                disabled={isDisabled("foot-walking")}
                                className={
                                    buttons[3]
                                        ? "m-1 rounded-full ring-4  ring-indigo-600"
                                        : "m-1 rounded-full ring-4  ring-indigo-200 transition ease-in-out delay-10 hover:shadow-xl hover:ring-indigo-600 hover:shadow-indigo-500 duration-250"
                                }
                                onClick={() => {
                                    if (!buttons[3]) {
                                        setButtons([false, false, false, true]);
                                        if (!isDisabled("foot-walking")) {
                                            let toSet = geoJsonSelect.filter(
                                                (g: CurrentGeoJson) => g.name === "foot-walking"
                                            )[0];
                                            setCurrentGeoJson(toSet);
                                        }
                                    }
                                }}
                            >
                                <WalkingIcon /*color="#4F46E5"*/ color="#4F46E5" thickness="16" />
                            </button>
                        </div>
                        <button
                            type="button"
                            className="rounded-full ring-4 ring-green-500 w-fit h-fit my-auto"
                            onClick={() => {
                                history.push('/following', { data: currentGeoJson?.data })
                            }}
                        >
                            <IonIcon icon={playCircleSharp} color='success' slot='end' size='large' className='align-middle ' />
                        </button>
                    </div>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Nome</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {data?.name}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Descrizione</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {data?.description}
                                    </dd>
                                </div>
                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Città</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <ul>
                                            {data?.cities?.map((city) => {
                                                return <li key={city?.id}> {city?.name}</li>;
                                            })}
                                        </ul>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Punti di visita
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <ol>
                                            {data?.points?.map((point) => {
                                                return <li key={point.poi.id}> {point.poi.name}</li>;
                                            })}
                                        </ol>
                                    </dd>
                                </div>
                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Tempo di visita totale
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {data?.geoJsonList?.length !== 0 &&
                                            Math.round(
                                                (data?.timeToVisit +
                                                    currentGeoJson?.data?.features[0]?.properties?.summary
                                                        ?.duration) /
                                                60
                                            )}{" "}
                                        minuti
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Km percorrenza totale
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {data?.geoJsonList?.length !== 0 &&
                                            mToKmRounded(
                                                currentGeoJson?.data?.features[0]?.properties?.summary?.distance
                                            )}{" "}
                                        km
                                    </dd>
                                </div>
                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        {state?.isRequest ? "Richiesta effettuata da:" : "Creato da : "}
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {data?.createdBy}
                                    </dd>
                                </div>
                                {state?.isRequest ? (
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Consensi</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {data?.consensus && data?.consensus +
                                                " / " +
                                                data?.cities?.length}
                                        </dd>
                                    </div>
                                ) : (
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Categorie</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <ul>
                                                {data?.categories?.map((category) => {
                                                    return (
                                                        <li key={category?.name}>
                                                            <IconToCategory key={category.id} category={category.name} height={6} width={6} />
                                                            {"  "}
                                                            {category.name}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </dd>
                                    </div>
                                )}
                                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Istruzioni</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {data?.geoJsonList?.length !== 0 && (
                                            <InstructionsComponent geojson={currentGeoJson?.data} />
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </>}
        </MyHeader>
    )
}

export default ItineraryDescriptionPage

