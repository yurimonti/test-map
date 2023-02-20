import React from 'react'
import { PoiRequest } from '../MyTypes/types'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText } from '@ionic/react'
import './PoiRequestCard.css';

interface Props {
    request?: PoiRequest
}

const PoiRequestCard: React.FC<Props> = ({ request }) => {

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

    return (
        <IonCard button={true} color={getType().card} onClick={() => {
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
    )
}

export default PoiRequestCard