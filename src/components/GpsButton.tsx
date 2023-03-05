import {FC} from 'react'
import { IonIcon } from '@ionic/react';
import {locate} from 'ionicons/icons';

interface Props {
    setTrigger:any
}

const GpsButton:FC<Props> = ({setTrigger}) => {
    return (
        <button className='bg-white bg-opacity-60 ring-2 ring-sky-600 rounded-full p-1 z-20 fixed top-36 left-auto ml-2' onClick={setTrigger} >
            <IonIcon color='primary' size='large' className='align-middle' icon={locate} />
        </button>
    );
}

export default GpsButton