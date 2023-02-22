import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router';
import { CategoryType, City, PoiTagRel, PoiType } from '../utility/types';
import { createModifyPoiRequest, createNewPoiRequest, getAllCategories, getAllCities, getAllTypes, getIdentifiersByCoords, getPoi } from '../api/touristApi';
import FormInfo from '../components/FormInfo';
import './form.css'
import MyHeader from '../components/MyHeader';
import { getToken, makePrivateRequest, makePublicRequest, privateRequest } from '../api/capacitorApi';
import { refresh } from 'ionicons/icons';
import LoadingComponent from '../components/LoadingComponent';
import MyModal from '../components/MyModal';
import { HttpResponse } from '@capacitor/core';

//FIXME: vedere perché aggiungi più tag 

const initialStateInputsString = {
    name: "",
    description: "",
    lat: 0,
    lon: 0,
    street: "",
    number: 0,
    ticket: "0.00",
    timeToVisit: 0.00,
    emailContacts: "",
    phoneContacts: "",
    faxContacts: "",
    cityPoi: {}
};

const PoiForm: React.FC = () => {
    const { id } = useParams<any | undefined>();
    const [tagValues, setTagValues] = useState<PoiTagRel[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryValues, setCategoryValues] = useState([]);
    const [types, setTypes] = useState<PoiType[]>([]);
    const [typeValues, setTypeValues] = useState([]);
    //-------------------------------------dopo-------------------
    const [inputsString, setInputsString] = useState(initialStateInputsString);

    const [cities, setCities] = useState<City[]>([]);
    const [city, setCity] = useState<City | null>(null);

    const [monday, setMonday] = useState<string[]>([]);
    const [tuesday, setTuesday] = useState<string[]>([]);
    const [wednesday, setWednesday] = useState<string[]>([]);
    const [thursday, setThursday] = useState<string[]>([]);
    const [friday, setFriday] = useState<string[]>([]);
    const [saturday, setSaturday] = useState<string[]>([]);
    const [sunday, setSunday] = useState<string[]>([]);
    const [resetted, setResetted] = useState<boolean>(false);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [trigger, setTrigger] = useState<boolean>(false);
    const [alertInfo, setAlertInfo] = useState({
        closeAlert: () => { setTrigger(false) },
        messages: {
            title: "",
            content: "",
            result: ""
        }
    });

    function renderForm(data: any) {
        let poiState = {
            name: data.name,
            description: data.description,
            lat: data.coordinate?.lat,
            lon: data.coordinate?.lon,
            street: data.address?.street,
            number: data.address?.number,
            ticket: data.ticketPrice,
            timeToVisit: data.timeToVisit,
            emailContacts: data.contact?.email,
            phoneContacts: data.contact?.cellNumber,
            faxContacts: data.contact?.fax,
            cityPoi: data.city
        }
        setInputsString(poiState);
        data.hours?.monday.length !== 0 &&
            setMonday(data.hours?.monday);
        data.hours?.tuesday.length !== 0 &&
            setTuesday(data.hours?.tuesday);
        data.hours?.wednesday.length !== 0 &&
            setWednesday(data.hours?.wednesday);
        data.hours?.thursday.length !== 0 &&
            setThursday(data.hours?.thursday);
        data.hours?.friday.length !== 0 &&
            setFriday(data.hours?.friday);
        data.hours?.saturday.length !== 0 &&
            setSaturday(data.hours?.saturday);
        data.hours?.sunday.length !== 0 &&
            setSunday(data.hours?.sunday);
        setTypeValues(data.types);
        setTagValues(data.tagValues);
        /* data.tagValues?.forEach((tv: PoiTagRel) => {
            setTagValues((previous: PoiTagRel[]) => {
                previous.push({ id: tv.id, tag: tv.tag, stringValue: tv.stringValue, booleanValue: tv.booleanValue });
                return previous;
            });
        }); */
    }



    /**
 * get all categories from server
 */
    /* async function getCategories() {
        try {
            const tokens = await getToken('categories');
            console.log(tokens);

            const categories = await makePrivateRequest({ url: "/user/categories", method: "get" }, tokens.access_token);
            setCategories(categories.data);
        } catch (err) {
            console.log(err);
        }
    } */

    /*     async function getTypesFiltered(filter: any) {
            try {
                const tokens = await getToken('types');
                console.log(tokens);
    
                const types = await makePrivateRequest({ url: "/user/poiTypes", method: "post", payload: filter }, tokens.access_token);
                setTypes(types.data);
            } catch (err) {
                console.log(err);
            }
        } */


    async function getDataById() {
        setIsLoading(true);
        try {
            const response = await getPoi(id);
            const data = response.data;
            renderForm(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        };
    }

    function wrapDay(day: string[]) {
        let result = [];
        for (const hour of day) {
            if (hour !== "") result.push(hour);
        }
        return result;
    }
    function resetHours() {
        setMonday(["", "", "", ""]);
        setTuesday(["", "", "", ""]);
        setWednesday(["", "", "", ""]);
        setThursday(["", "", "", ""]);
        setFriday(["", "", "", ""]);
        setSaturday(["", "", "", ""]);
        setSunday(["", "", "", ""]);
    }

    function handleInputsString(e: any) {
        setInputsString((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    async function reset() {
        setCity(null);
        setTagValues([]);
        //setCategories([]);
        setCategoryValues([]);

        //setTypes([]);
        setTypeValues([]);
        setInputsString(initialStateInputsString);
        resetHours();
        setIsLoading(true);
        try {
            const token = await getToken();
            const cities = await makePrivateRequest({ url: "/user/city", method: "get" }, token!);
            const types = await makePrivateRequest({ url: "/user/poiTypes", method: "post", payload: [] }, token!);
            setCities(cities.data);
            setTypes(types.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function getCities() {
        /*         try {
                    const tokens = await getToken('cities');
                    const cities = await makePrivateRequest({ url: "/user/city", method: "get" }, tokens.access_token);
                    setCities(cities.data);
                } catch (err) {
                    console.log(err);
                } */
        /* getAllCities()
            .then((res: any) => {
                setCities(res.data);
            })
            .catch(err => console.log(err)); */
    }

    async function init() {
        setIsLoading(true);
        try {
            const token = await getToken();
            const cities = await makePrivateRequest({ url: "/user/city", method: "get" }, token!);
            const types = await makePrivateRequest({ url: "/user/poiTypes", method: "post", payload: [] }, token!);
            const categories = await makePrivateRequest({ url: "/user/categories", method: "get" }, token!);
            setCities(cities.data);
            setTypes(types.data);
            setCategories(categories.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        init();
        /* getCities(); */
        console.log(city);
        id && getDataById();
        /* getCategories();
        getTypesFiltered([]); */
        return () => {
            reset();
        }
    }, [id])

    function getTypesFiltered(filter: any) {
        getAllTypes(filter)
            .then((res: any) => {
                setTypes(res.data);
                console.log(res.status);
            })
            .catch((err) => console.log(err));
    }

    const formInfoProps = {
        buttons: [
            {
                text: "Reset", onClick: () => {
                    id ? getDataById() : reset();
                }
            },
            {
                text: "Save", onClick: () => {
                    id ? sendRequest(false) : sendRequest(true);
                }
            }
        ],
        inputs: {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday,
            city: !id ? city as City : undefined,
            cities: cities,
            typeValues: typeValues,
            types: types,
            categoryValues: categoryValues,
            categories: categories,
            tagValues: tagValues,
            inputsString: inputsString
        },
        actions: {
            setTagValues: setTagValues,
            setCategories: setCategories,
            setCategoryValues: setCategoryValues,
            setTypes: setTypes,
            setTypeValues: setTypeValues,
            setCities: setCities,
            setCity: setCity,
            setMonday: setMonday,
            setTuesday: setTuesday,
            setWednesday: setWednesday,
            setThursday: setThursday,
            setFriday: setFriday,
            setSaturday: setSaturday,
            setSunday: setSunday,
            setInputsString: setInputsString,
            handleInputsString: handleInputsString,
            getTypesFiltered: getTypesFiltered
        }
    }

    const payload = {
        idPoi: id || null,
        name: inputsString.name,
        description: inputsString.description,
        coordinate: {
            id: null,
            lat: inputsString.lat,
            lon: inputsString.lon
        },
        timeToVisit: inputsString.timeToVisit,
        ticketPrice: inputsString.ticket,
        timeSlot: {
            id: null,
            monday: wrapDay(monday),
            tuesday: wrapDay(tuesday),
            wednesday: wrapDay(wednesday),
            thursday: wrapDay(thursday),
            friday: wrapDay(friday),
            saturday: wrapDay(saturday),
            sunday: wrapDay(sunday),
        },
        address: {
            id: null,
            street: inputsString.street,
            number: inputsString.number
        },
        types: typeValues,
        tagValues: tagValues,
        contact: {
            id: null,
            email: inputsString.emailContacts,
            cellNumber: inputsString.phoneContacts,
            fax: inputsString.faxContacts
        }
    }

    async function isInMyCity() {
        let result = false;
        try {
            const id = await getIdentifiersByCoords({ lat: inputsString.lat, lon: inputsString.lon });
            console.log(id);
            console.log(city?.identifiers);
            console.log(city);
            if (city) {
                result = city.identifiers.map(i => i.toString()).includes(id);
            }
        } catch (error) {
            console.log(error);
        }
        return result;
    }

    /* async function thenFunction(functionTarget: any) {
        try {
            const response: HttpResponse = await functionTarget;
            console.log(response.status);
            setAlertInfo({
                messages: {
                    title: "SUCCESSO",
                    content: "Richiesta creata correttamente",
                    result: "OK"
                },
                closeAlert: () => {
                    setTrigger(false);
                    history.push("/map");
                }
            });
        } catch (err) {
            console.log(err);
            setAlertInfo({
                messages: {
                    title: "ERRORE",
                    content: "Richiesta non creata",
                    result: "ERRORE"
                },
                closeAlert: () => {
                    setTrigger(false);
                }
            })
        } finally{
            setIsLoading(false);
            setTrigger(true);
        } */

        /* functionTarget.then((res: any) => {
            console.log(res.status);
            setAlertInfo({
                messages: {
                    title: "SUCCESSO",
                    content: "Richiesta creata correttamente",
                    result: "OK"
                },
                closeAlert: () => {
                    setTrigger(false);
                    history.push("/map");
                }
            });
            setTrigger(true);
        }) */
        /*        .catch ((err: any) => {
       console.log(err);
       setAlertInfo({
           messages: {
               title: "ERRORE",
               content: "Richiesta non creata",
               result: "ERRORE"
           },
           closeAlert: () => {
               setTrigger(false);
           }
       })
       setTrigger(true);
   }) */
    /* }
 */
    async function sendRequest(isNew: boolean) {
        setIsLoading(true);
        if (isNew) {
            const isIn = await isInMyCity();
            console.log(isIn);
            if (isIn === true) {
                try {
                    const response: HttpResponse = await createNewPoiRequest(payload, (city as City).id);
                    console.log(response.status);
                    setAlertInfo({
                        messages: {
                            title: "SUCCESSO",
                            content: "Richiesta creata correttamente",
                            result: "OK"
                        },
                        closeAlert: () => {
                            setTrigger(false);
                            history.push("/requests");
                        }
                    });
                } catch (err) {
                    console.log(err);
                    setAlertInfo({
                        messages: {
                            title: "ERRORE",
                            content: "Richiesta non creata",
                            result: "ERRORE"
                        },
                        closeAlert: () => {
                            setTrigger(false);
                        }
                    })
                } finally{
                    setIsLoading(false);
                    setTrigger(true);
                }
            } else {
                setAlertInfo({
                    messages: {
                        title: "Verifica coordinate",
                        content: "POI cordinate non appartenenti alla città selezionata",
                        result: "ERRORE"
                    },
                    closeAlert: () => {
                        setTrigger(false);
                    }
                })
                setIsLoading(false);
                setTrigger(true);
            }
        } else {
            try {
                const response: HttpResponse = await createModifyPoiRequest(payload);
                console.log(response.status);
                setAlertInfo({
                    messages: {
                        title: "SUCCESSO",
                        content: "Richiesta creata correttamente",
                        result: "OK"
                    },
                    closeAlert: () => {
                        setTrigger(false);
                        history.push("/requests");
                    }
                });
            } catch (err) {
                console.log(err);
                setAlertInfo({
                    messages: {
                        title: "ERRORE",
                        content: "Richiesta non creata",
                        result: "ERRORE"
                    },
                    closeAlert: () => {
                        setTrigger(false);
                    }
                })
            } finally{
                setIsLoading(false);
                setTrigger(true);
            }
        }
    }

    //-------------------------------------------handle inputs----------------------------------------------

    return (
        <MyHeader title='Modulo POI' backButton>
            {isLoading ? <LoadingComponent /> : <div className="Form">
                <div className="px-4 pt-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Informazioni POI Base
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Queste informazioni verranno visualizzate pubblicamente, quindi fai
                        attenzione a ciò che condividi.
                    </p>
                </div>
                {isLoading ?
                    <LoadingComponent /> :
                    <div className="mt-2 md:mt-0 md:col-span-2">
                        <FormInfo
                            inputs={formInfoProps.inputs}
                            actions={formInfoProps.actions}
                            buttons={formInfoProps.buttons}
                        />
                    </div>}
                <MyModal
                    show={trigger}
                    onClose={alertInfo.closeAlert}
                    messages={alertInfo.messages}
                />
            </div>}
        </MyHeader>
    )
}

export default PoiForm