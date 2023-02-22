import { useState, FC, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { getPoi } from '../api/touristApi';
import LoadingComponent from '../components/LoadingComponent';
import PoiDescriptionComponent from '../components/PoiDescriptionComponent';
import { POI } from '../utility/types';
import MyHeader from '../components/MyHeader';

const PoiDescriptionPage: FC = () => {
    const [poi, setPoi] = useState<POI | undefined>(undefined);
    const { id } = useParams<any | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    async function getDataById() {
        setIsLoading(true);
        try {
            const { data } = await getPoi(id);
            setPoi(data);
        } catch (err) {
            console.log(err);

        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getDataById();
        return () => {
            setPoi(undefined);
        };
    }, [id]);


    return (
        <MyHeader backButton title='POI'>
            {/*before had also flex */}
            {isLoading ? <LoadingComponent /> :
            <>
                <div className="flex justify-center mt-4 align-center">
                    <button
                        type="button"
                        className="bg-white text-md font-sans p-2 flex float-left ml-3 ring-2 rounded-md ring-sky-400 transition ease-in-out shadow-sky-200 shadow-md  delay-10 duration-400 mb-4 "
                        onClick={() => {
                            history.push("/poi-form/poi/" + poi?.id, { poi: true });
                        }}
                    >
                        Modifica Poi
                    </button>
                </div>
                <PoiDescriptionComponent poi={poi} />
            </>}
        </MyHeader>
    )
}

export default PoiDescriptionPage