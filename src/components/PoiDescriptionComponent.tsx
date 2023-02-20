import { FC, ReactNode } from 'react'
import { POI, PoiTagRel } from '../MyTypes/types'
import { IonIcon } from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import './PoiDescriptionComponent.css';

interface Props {
    poi?: POI
}

function renderHours(hours: string[]) {
    if (hours.length === 2) return hours[0] + " - " + hours[1];
    if (hours.length === 4) return hours[0] + " - " + hours[1] + " | " + hours[2] + " - " + hours[3];
    return "chiuso";
}

function printArray(array: any[]) {
    let result = "";
    result = array[0] + "; ";
    for (let index = 1; index < array.length; index++) {
        const element = array[index];
        result = result + element + "; ";
    }
    return result;
}

function iconBooleanTag(tagRel: PoiTagRel): ReactNode | string {
    if (tagRel.tag.isBooleanType) {
        return tagRel.booleanValue ? 
        <IonIcon icon={checkmarkCircle} slot='end' className='icon icon-true' /> : 
        <IonIcon icon={closeCircle} slot='end' className='icon icon-false' />
    } else return tagRel.stringValue;
}

const PoiDescriptionComponent: FC<Props> = ({ poi }) => {

    return poi ? (
        <div className="bg-white clear-both shadow overflow-hidden sm:rounded-lg">
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">Nome</dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            {poi?.name}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">Descrizione</dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            {poi?.description}
                        </dd>
                    </div>
                    <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">Città</dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            {poi?.city?.name}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="tfont-sans text-gray-500">Coordinate</dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul>
                                <li>Latitudine: {poi?.coordinate?.lat}</li>
                                <li> Longitudine: {poi?.coordinate?.lon} </li>
                            </ul>
                        </dd>
                    </div>
                    <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">
                            Costo Ticket
                        </dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            {poi.ticketPrice}€
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">Orari</dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            <p className={poi?.hours?.isOpen ? "mb-3 text-green-700" : "mb-3 text-red-600"}>
                                Adesso è {poi?.hours?.isOpen ? "Aperto" : "Chiuso"}
                            </p>
                            {poi.hours.monday && (
                                <p>Lunedì: {renderHours(poi.hours.monday)}</p>
                            )}
                            {poi.hours.tuesday && (
                                <p>Martedì: {renderHours(poi.hours.tuesday)}</p>
                            )}
                            {poi.hours.wednesday && (
                                <p>Mercoledì: {renderHours(poi.hours.wednesday)}</p>
                            )}
                            {poi.hours.thursday && (
                                <p>Giovedì: {renderHours(poi.hours.thursday)}</p>
                            )}
                            {poi.hours.friday && (
                                <p>Venerdì: {renderHours(poi.hours.friday)}</p>
                            )}
                            {poi.hours.saturday && (
                                <p>Sabato: {renderHours(poi.hours.saturday)}</p>
                            )}
                            {poi.hours.sunday && (
                                <p>Domenica: {renderHours(poi.hours.sunday)}</p>
                            )}
                        </dd>
                    </div>
                    <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">Indirizzo</dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            {poi?.address?.street}, {poi?.address?.number}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">Contatti</dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul>
                                <li>Email: {poi?.contact?.email}</li>
                                <li>Tel: {poi?.contact?.cellNumber}</li>
                                <li>Fax: {poi?.contact?.fax}</li>
                            </ul>
                        </dd>
                    </div>
                    <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">
                            Contributori
                        </dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            {poi?.contributors.length === 0
                                ? "..."
                                : poi?.contributors.map((c) => {
                                    return <li> {c}</li>;
                                })}
                        </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">Tipo di Poi</dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            {printArray(poi.types.map((t) => t.name))}
                        </dd>
                    </div>
                    <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">Tags</dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            {poi.tagValues.map((tv) => {
                                return (
                                    <li key={tv.id}>
                                        {" "}
                                        {tv.tag.name} :{" "}
                                        {iconBooleanTag(tv)}
                                    </li>
                                );
                            })}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-sans text-gray-500">
                            Tempo di visita
                        </dt>
                        <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                            {poi.timeToVisit} minuti
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    ) : null
}

export default PoiDescriptionComponent