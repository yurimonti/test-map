import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { PageInfoContext } from './HeaderProvider';

interface Props {
    children?: ReactNode,
    backButton?:boolean,
    title?:string

};

const MyHeader: React.FC<Props> = ({ children,backButton,title }) => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {backButton && <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>}
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton fill='clear'>login</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                {children}
            </IonContent>
        </IonPage>

    )
}

export default MyHeader