import React, { useEffect, useState } from 'react';
import { PoiRequest } from '../MyTypes/types';
//import { Camera } from "@capacitor/camera";
import "./RequestPage.css";
import MyHeader from '../components/MyHeader';
import PoiRequestCard from '../components/PoiRequestCard';
import { getTouristpoiRequests } from '../api/touristApi';
import LoadingComponent from '../components/LoadingComponent';
import { HttpResponse } from '@capacitor/core';
import { IonIcon, IonItem } from '@ionic/react';
import {addCircleOutline} from 'ionicons/icons'
import { useHistory } from 'react-router';

const RequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<PoiRequest[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  async function getAllPoiRequests() {
    setIsLoading(true);
    console.log('poi request call');
    try {
      const response = await getTouristpoiRequests();
      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
    /* getTouristpoiRequests()
      .then((res: any) => {
        setRequests(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) }); */
  }

  useEffect(() => {
    getAllPoiRequests();
    return () => {
      setRequests([])
    }
  }, [reload])
  /* function takePicture() {
      this.camera.getPicture({
          
      }).then(
          (imageData) => {
            // Do something with the new photo
          },
          (err) => {
            // Handle error
            console.log('Camera issue: ' + err);
          }
        );
  } */

  return (
    <MyHeader title='Richieste' backButton>
      {isLoading ? <LoadingComponent  /> :
        <div className='request-container'>
          {/* <button className='flex mx-auto ring-2 ring-indigo-500 my-2 w-fit justify-center align-middle' >Nuovo Poi<IonIcon icon={addCircleOutline} slot='end' className='align-middle my-auto' /></button> */}
          <button
            onClick={() => {
              history.push("/poi-form");
            }}
            className='mt-4 text-indigo-500 bg-gray-50 rounded-lg ring-2 ring-blue-500 py-2 flex font-bold text-md justify-center align-middle mx-3'
          >
              <p className='font-bold text-md'>Aggiungi POI</p>
              <IonIcon icon={addCircleOutline} slot='end' className='align-middle my-auto ml-2' />
          </button>
          {requests.map(request => {
            return <PoiRequestCard key={request.id} request={request} />
          })}
        </div>}

    </MyHeader>
  );
}

export default RequestsPage;