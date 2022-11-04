import React from 'react';
import "./Home.css";
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent,IonButtons,IonBackButton } from '@ionic/react';

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
                    <p>Requests</p>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default RequestsPage;