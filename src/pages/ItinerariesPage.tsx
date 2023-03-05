import { useState, useEffect, FC, useRef } from 'react';
import "./Home.css";
import MyHeader from '../components/MyHeader';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import LoadingComponent from '../components/LoadingComponent';
import { City, Itinerary } from '../utility/types';
import { addCircleOutline, arrowDownOutline, arrowUpOutline } from 'ionicons/icons';
import ItineraryCard from '../components/ItineraryCard';
import { getAllCities, getItineraries, getItineraryFromCity } from '../api/touristApi';

interface ThisCity {
    id: string,
    name: string
}

const ItinerariesPage: FC = () => {
    const [toggle, setToggle] = useState([
        true, false
    ]);
    const [reload, setReload] = useState(false);
    const citySearch = useRef<any>();
    const [filteredItineraries, setFilteredItineraries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [city, setCity] = useState<ThisCity>({ id: "", name: "" });
    const [cities, setCities] = useState<City[]>([]);
    const history = useHistory();


    const filteringCities = () => {
        return cities.filter((c: City) => c.name.toLowerCase().includes(city.name.toLowerCase()));
    }

    const fillCities = async () => {
        try {
            const response = await getAllCities();
            setCities(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    async function getItineraryFiltered(id: number) {
        setIsLoading(true);
        try {
            const response = await getItineraryFromCity(id);
            setFilteredItineraries(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }

    const myItineraries = () => {
        return isLoading ? <LoadingComponent /> : itineraries.length === 0 ? (
            <h3 className="flex justify-center m-auto">Nessuna Itinerario</h3>
        ) : (
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {/* card content */}
                {itineraries.map(itinerary => {
                    return <ItineraryCard key={itinerary.id} itinerary={itinerary} reloadAction={setReload} />
                })}
            </div>
        )
    }

    const defaultItinerary = () => {
        return (
            <div>
                {/* card content */}
                <div className='flex w-2/3 lg:w-1/4 mt-4'>
                    <input
                        type="search"
                        id="search-city"
                        name="search-city"
                        autoComplete='off'
                        required
                        value={city?.name}
                        className="rounded-md appearance-none relative block w-full px-3 py-2 ring-2 ring-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Select City"
                        onChange={(e) => {
                            let value = e.target.value;
                            setCity({ id: "", name: value });
                            if (value === "") citySearch.current.hidden = true;
                        }}
                    />
                </div>
                {city.id === "" && city.name !== "" && <ul ref={citySearch} className='border-2 w-2/3 lg:w-1/4 border-indigo-300'>
                    {filteringCities().map(c => {
                        return (<li onClick={() => {
                            setCity({ id: c.id.toString(), name: c.name });
                            citySearch.current.hidden = true;
                            getItineraryFiltered(c.id);
                        }} key={c.id}>{c.name}</li>)
                    })}
                </ul>}
                {isLoading ? <LoadingComponent /> : filteredItineraries.length === 0 && city.id !== "" ?
                    <h3 className="flex justify-center m-auto">Nessun Itinerario Disponibile</h3>
                    : <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {filteredItineraries.map((itinerary) => {
                            return (
                                <ItineraryCard itinerary={itinerary} reloadAction={setReload} />
                            );
                        })}
                    </div>}
            </div>
        )
    }

    function getMyItineraries() {
        setIsLoading(true);
        getItineraries().then((res: any) => setItineraries(res.data)).catch((err: any) => console.log(err))
            .finally(() => { setIsLoading(false) })
    }

    useEffect(() => {
        fillCities();
        getMyItineraries();
        return () => {
            setCities([]);
            setCity({ name: "", id: "" });
            setFilteredItineraries([]);
            setItineraries([]);
        }
    }, [reload])

    return (
        <MyHeader title='Itinerari' backButton>
            <div className="max-w-2xl my-2 sm:mt-0 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className='text-center sm:text-inherit sm:flex sm:flex-row-reverse sm:justify-between text-sm'>
                    <button
                        onClick={() => {
                            history.push("/itinerary");
                        }}
                        className='mt-2 mb-4 sm:mt-auto text-blue-500 bg-gray-50 rounded-lg ring-2 ring-blue-500 hover:bg-blue-500 hover:text-white p-2'
                    >
                        <span className='flex m-auto font-bold text-md'>
                            <p className='m-auto'>aggiungi itinerario</p>
                            <IonIcon icon={addCircleOutline} size='large' slot='end' className='align-middle my-auto ml-2' />
                            {/* <PlusCircleIcon className="h-7 w-7 ml-2" aria-hidden="true" /> */}
                        </span>
                    </button>
                    <button onClick={() => setToggle(prev => { return [!prev[0], prev[1]] })}
                        className="flex" >
                        <h2 className="pr-4 text-2xl font-extrabold tracking-wide text-gray-900">
                            I miei Itinerari
                        </h2>
                        {toggle[0] ? <IonIcon icon={arrowUpOutline} slot='end' className='align-middle my-auto' /> :
                            <IonIcon icon={arrowDownOutline} slot='end' className='align-middle my-auto' />}
                    </button>
                </div>
                {toggle[0] && myItineraries()}
                <button onClick={() => setToggle(prev => { return [prev[0], !prev[1]] })}
                    className="flex mt-5" >
                    <h2 className="pr-4 text-2xl font-extrabold tracking-wide text-gray-900">
                        Itinerari Predefiniti
                    </h2>
                    {toggle[1] ? <IonIcon icon={arrowUpOutline} slot='end' className='align-middle my-auto' /> :
                        <IonIcon icon={arrowDownOutline} slot='end' className='align-middle my-auto' />}
                </button>
                {toggle[1] && defaultItinerary()}
            </div>
        </MyHeader>
    );
}

export default ItinerariesPage;