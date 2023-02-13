import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Route,Redirect } from 'react-router';
import { map,home,bookmark,compass } from 'ionicons/icons';
import MapPage from '../pages/MapPage';
import HomeProva from '../pages/HomeProva';
import RequestsPage from '../pages/RequestsPage';
import ItinerariesPage from '../pages/ItinerariesPage';
import LoginPage from '../pages/LoginPage';

const TabsExample: React.FC = () => (

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

 {/*      <IonTabButton tab="home" href='/home'>
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton> */}

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
);

export default TabsExample;