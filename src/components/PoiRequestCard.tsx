import { ReactNode, FC, useState } from 'react'
import { PoiRequest, PoiTagRel } from '../utility/types'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonText } from '@ionic/react'
import './PoiRequestCard.css';
import ModalComponent from './ModalComponent';
import { printHours, printTypes } from '../utility/functionUtility';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import { deleteTouristPoiRequest } from '../api/touristApi';
import MyModal from './MyModal';
import LoadingComponent from './LoadingComponent';

interface Props {
    request?: PoiRequest,
    reloadAction: (p: any) => void
}

interface AlertState {
    messages: {
        title: string,
        content: string,
        result: string
    },
    close: () => void
}

const PoiRequestCard: FC<Props> = ({ request, reloadAction }) => {
    const [modalTrigger, setModalTrigger] = useState<boolean>(false);
    const [alertTrigger, setAlertTrigger] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alertState, setAlertState] = useState<AlertState>({
        messages: {
            title: "ERRORE",
            content: "Errore nella richiesta ",
            result: "Indietro"
        }, close: () => {
            setAlertTrigger(false);
            reloadAction((p: boolean) => { return !p });
        }
    })

    async function deletePoiRequest() {
        setModalTrigger(false);
        setIsLoading(true);
        try {
            await deleteTouristPoiRequest(request!.id);
            setAlertState(prev => {
                return {
                    ...prev, messages: {
                        title: "SUCCESSO",
                        content: "Eliminata con successo",
                        result: "OK"
                    }
                }
            })
        } catch (err) {
            console.log(err);
            setAlertState(prev => {
                return {
                    ...prev, messages: {
                        title: "ERRORE",
                        content: "Errore nella richiesta ",
                        result: "Indietro"
                    }
                }
            });
        } finally {
            setIsLoading(false);
            setAlertTrigger(true);
        }
    }

    const buttons = {
        deny: request?.status === "REJECTED" || request?.status === "ACCEPTED" ? undefined : {
            title: "rifiuta richiesta",
            action: () => {
                deletePoiRequest();
            }
        }
    }

    /* const subtitle: string = request?.poi === null ? 'Aggiunta' : 'Modifica'; */
    const getType = () => {
        let result;
        switch (request?.status) {
            case 'ACCEPTED': result = { card: 'success', text: 'dark', status: 'Accettata' }
                break;
            case 'REJECTED': result = { card: 'danger', text: 'light', status: 'Rifiutata' }
                break;
            default: result = { card: 'warning', text: 'dark', status: 'In Attesa' }
                break;
        }
        return result;
    }

    const castDescription = (description: string | undefined) => {
        if (description) {
            if (description.length > 40) return description.slice(0, 40) + '...'
            else return description;
        }
        else return undefined;
    }

    function renderhours() {
        let hours = [];
        hours.push(request?.hours.monday);
        hours.push(request?.hours.tuesday);
        hours.push(request?.hours.wednesday);
        hours.push(request?.hours.thursday);
        hours.push(request?.hours.friday);
        hours.push(request?.hours.saturday);
        hours.push(request?.hours.sunday);
        return (
            <div>
                <p>{printHours("Lunedì", hours[0] as string[])}</p>
                <p>{printHours("Martedì", hours[1] as string[])}</p>
                <p>{printHours("Mercoledì", hours[2] as string[])}</p>
                <p>{printHours("Giovedì", hours[3] as string[])}</p>
                <p>{printHours("Venerdì", hours[4] as string[])}</p>
                <p>{printHours("Sabato", hours[5] as string[])}</p>
                <p>{printHours("Domenica", hours[6] as string[])}</p>
            </div>
        );
    }

    function iconBooleanTag(tagRel: PoiTagRel): ReactNode | string {
        if (tagRel.tag.isBooleanType) {
            return tagRel.booleanValue ?
                <IonIcon icon={checkmarkCircle} slot='end' className='icon icon-true' /> :
                <IonIcon icon={closeCircle} slot='end' className='icon icon-false' />
        } else return tagRel.stringValue;
    }

    function renderTags() {
        return request?.tagValues.map((tv) => {
            return (
                <p key={tv.tag.id}>
                    {tv.tag.name}:{" "}
                    {iconBooleanTag(tv)}
                </p>
            );
        });
    }

    return isLoading ? <LoadingComponent /> : (
        <>
            <IonCard button={true} color={getType().card} onClick={() => {
                setModalTrigger(true);
                console.log(request);
            }}>
                <IonCardHeader>
                    <IonCardTitle>
                        <IonText color={getType().text}>
                            {request?.name}
                        </IonText>
                    </IonCardTitle>
                    <IonCardSubtitle>
                        <IonText color={getType().text}>
                            {getType().status.toUpperCase()}
                        </IonText>
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent  >
                    <IonText color={getType().text}>
                        <p>{castDescription(request?.description)}</p>
                    </IonText>
                    <IonText color={getType().text}>
                        <p>lat: {request?.coordinate?.lat} lng: {request?.coordinate?.lon}</p>
                    </IonText>
                </IonCardContent>
            </IonCard>
            <ModalComponent
                open={modalTrigger}
                onClose={() => {
                    setModalTrigger(false)
                }}
                deny={buttons?.deny}
                title={getType().status.toUpperCase()}
            >
                <p>{request?.name}</p>
                <p>{request?.description}</p>
                <p>{printTypes(request)}</p>
                <p>{"lat: " + request?.coordinate?.lat}</p>
                <p>{"lng: " + request?.coordinate?.lon}</p>
                {renderhours()}
                {renderTags()}
                <p>{"Da :" + request?.username}</p>
            </ModalComponent>
            <MyModal show={alertTrigger}
                onClose={alertState.close}
                messages={alertState.messages} />
        </>
    )
}

export default PoiRequestCard;

