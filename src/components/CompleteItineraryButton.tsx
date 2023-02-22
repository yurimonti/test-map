import {FC} from 'react'
import { IonIcon } from '@ionic/react'
import { arrowForwardOutline} from 'ionicons/icons'
import './icon.css';

interface Props {
    onClick:any
}

const CompleteItineraryButton:FC<Props> = ({onClick}) => {
  return (
    <button
          type="button"
          className="bg-white transition ease-in-out delay-10 sm:hover:shadow-lg sm:hover:scale-105 sm:hover:shadow-indigo-500 duration-250 p-1 flex sm:float-right sm:m-2 mx-auto mt-4 ring-2 rounded-md sm:hover:ring-indigo-600 ring-indigo-400"
          onClick={onClick}
        >
          Completa{" "}
          <IonIcon icon={arrowForwardOutline} slot='end' className='icon icon-tertiary' />
        </button>
  )
}

export default CompleteItineraryButton