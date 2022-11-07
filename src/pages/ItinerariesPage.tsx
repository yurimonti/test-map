import { IonContent, IonHeader, IonPage, IonTitle,IonButtons,IonToolbar,IonBackButton } from '@ionic/react';
import React from 'react';
import MyCard from '../components/MyCard';
import "./Home.css";

const ItinerariesPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Itineraries</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                <div className='container'>
                    <MyCard title='ciao' subtitle='questa è una card' content='Esempio di Card' />
                </div>
            </IonContent>
        </IonPage>
    )
}

export default ItinerariesPage;