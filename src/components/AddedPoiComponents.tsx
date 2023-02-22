import { FC, useState } from 'react'
import DropDownComponent from './DropDownComponent'
import { POI } from '../utility/types'
import { ItRelPoi } from '../utility/types';
import { IonIcon } from '@ionic/react';
import { closeCircle } from 'ionicons/icons'
import './icon.css';
import CompleteItineraryButton from './CompleteItineraryButton';

interface Props {
  pois: POI[],
  addPois: any,
  label: number,
  onComplete:any
}

const AddedPoiComponents: FC<Props> = ({ pois, addPois, label,onComplete }) => {

  /* const count = pois.length; */

  function deletePoiFromAdded(poi: POI) {
    addPois((prev: POI[]) => {
      let another: POI[] = [...prev];
      let index = another.indexOf(poi);
      if (index !== -1) {
        another.splice(index, 1);
      }
      return another;
    });
  }

  return (
    <DropDownComponent
      label={label.toString()}
      menuStyle="bg-white bg-opacity-80 w-80 mt-4 p-6 rounded-md bg-white ring-2 ring-indigo-600 overflow-hidden text-black"
      buttonStyle="bg-gray-50 ring-2 ring-indigo-600 inline-flex rounded-xl px-4 py-2 text-black"
    >

      <ol className="ml-2 sm:ml-0">
        {pois.map((poi) => {
          return (
            <li role="list" key={poi.id}>
              {" "}
              {poi.name}
              <button
                key={poi.id}
                type="button"
                onClick={() => {
                  deletePoiFromAdded(poi);
                }}
                className="ml-1"
              >
                <IonIcon icon={closeCircle} slot='end' className='icon icon-false' />
              </button>
            </li>
          );
        })}
      </ol>
      <CompleteItineraryButton onClick={onComplete} />
    </DropDownComponent>
  )
}

export default AddedPoiComponents