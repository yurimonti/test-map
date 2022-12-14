import React from 'react';
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent,IonButtons,IonBackButton } from '@ionic/react';
import "./Home.css";

const RequestsPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Requests</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                <div className='container'>
                    <p className='text-sky-300'>Requests</p>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default RequestsPage;