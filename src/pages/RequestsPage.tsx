import React,{useEffect,useContext} from 'react';
import { PageInfoContext } from '../components/HeaderProvider';
//import { Camera } from "@capacitor/camera";
import "./Home.css";
import MyHeader from '../components/MyHeader';

const RequestsPage: React.FC = () => {
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
            <div className='container'>
                <p className='text-sky-300'>Requests</p>
            </div>
        </MyHeader>
    );
}

export default RequestsPage;