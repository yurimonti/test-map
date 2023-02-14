import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonApp, IonHeader, IonContent, IonTitle, IonRouterOutlet } from '@ionic/react';
import { calendar, personCircle, map, informationCircle, compass, bookmark } from 'ionicons/icons';
import MyHeader from './components/MyHeader';
import { Route, Redirect } from 'react-router';
import HomeProva from './pages/HomeProva';
import ItinerariesPage from './pages/ItinerariesPage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import RequestsPage from './pages/RequestsPage';
import { HeaderProvider, PageInfoContext } from './components/HeaderProvider';

/* type Props = {
    title?: string,
    children?: React.ReactNode,
} */

const AppContent: React.FC = (/* { title, children } */) => {

    return (
        <IonApp>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/home" component={HomeProva} />
                    <Route exact path="/map" component={MapPage} />
                    <Route exact path="/requests" component={RequestsPage} />
                    <Route exact path="/itineraries" component={ItinerariesPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/">
                        <Redirect to="/map" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="map" href='/map'>
                        <IonIcon icon={compass} />
                        <IonLabel>Map</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="requests" href='/requests'>
                        <IonIcon icon={bookmark} />
                        <IonLabel>Requests</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="itineraries" href='/itineraries'>
                        <IonIcon icon={map} />
                        <IonLabel>Itineraries</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonApp>
    )
};

export default AppContent;