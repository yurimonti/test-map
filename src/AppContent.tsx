import React, { useContext } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonApp, IonRouterOutlet } from '@ionic/react';
import { map, compass, bookmark, heart } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import HomeProva from './pages/HomeProva';
import ItinerariesPage from './pages/ItinerariesPage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import RequestsPage from './pages/RequestsPage';
import { UserContext } from './components/MyUserContext';
import PoiForm from './pages/PoiForm';
import PoiDescriptionPage from './pages/PoiDescriptionPage';
import CreateItineraryPage from './pages/CreateItineraryPage';
import ItineraryDescriptionPage from './pages/ItineraryDescriptionPage';
import ExecItineraryPage from './pages/ExecItineraryPage';

const AppContent: React.FC = () => {
    const userContext = useContext(UserContext);
    const authShell =
        <>
            <Route exact path="/home" component={HomeProva} />
            <Route exact path="/map" render={()=>{
                return <MapPage renderAll={true} />
            }}  />
            <Route exact path="/requests" component={RequestsPage} />
            <Route exact path="/itineraries" component={ItinerariesPage} />
            <Route exact path="/itineraries/:id" component={ItineraryDescriptionPage} />
            <Route exact path="/following" component={ExecItineraryPage} />
            <Route exact path="/itinerary" component={CreateItineraryPage} />
            <Route exact path="/poi-form" component={PoiForm} />
            <Route exact path="/poi-form/poi/:id" component={PoiForm} />
            <Route exact path="/pois/:id" component={PoiDescriptionPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/">
                <Redirect to="/map" />
            </Route>
        </>;

    const notAuthShell = <>
        <Route exact path="/home" component={HomeProva} />
        <Route exact path="/login" component={LoginPage} />
        {/* <Route exact path='/map' component={MapPage} /> */}
        <Route exact path="/">
            <Redirect to="/home" />
        </Route>
    </>;

    const routes = userContext?.userInfo?.isAuth === true ? authShell : notAuthShell;
    const bar = userContext?.userInfo?.isAuth === true ? <IonTabBar slot="bottom">
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
    </IonTabBar> : <IonTabBar />;

    return (
        <IonApp>
            <IonTabs>
                <IonRouterOutlet>
                    {routes}
                </IonRouterOutlet>
                {bar}
            </IonTabs>
        </IonApp>
    )
};

export default AppContent;