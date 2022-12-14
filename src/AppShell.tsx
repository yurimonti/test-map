import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonApp, IonHeader, IonContent, IonTitle } from '@ionic/react';
import { calendar, personCircle, map, informationCircle } from 'ionicons/icons';

type Props = {
    title?: string,
    children?: React.ReactNode,
}

const AppShell: React.FC<Props> = ({title,children}) => (
    <IonApp>
        <IonHeader>
            <IonTitle>{title}</IonTitle>
        </IonHeader>
        <IonContent>
            {children}
        </IonContent>
        <IonTabs>
            <IonTabBar slot="bottom">
                <IonTabButton tab="schedule">
                    <IonIcon icon={calendar} />
                    <IonLabel>Schedule</IonLabel>
                    <IonBadge>6</IonBadge>
                </IonTabButton>

                <IonTabButton tab="speakers">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Speakers</IonLabel>
                </IonTabButton>

                <IonTabButton tab="map">
                    <IonIcon icon={map} />
                    <IonLabel>Map</IonLabel>
                </IonTabButton>

                <IonTabButton tab="about">
                    <IonIcon icon={informationCircle} />
                    <IonLabel>About</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    </IonApp>
);

export default AppShell;