import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Route,Redirect } from 'react-router';
import { map,home,bookmark } from 'ionicons/icons';
import MapPage from '../pages/MapPage';
import HomeProva from '../pages/HomeProva';
import RequestsPage from '../pages/RequestsPage';

const TabsExample: React.FC = () => (
  <IonTabs>
     <IonRouterOutlet>
          <Route exact path="/home" component={HomeProva} />
          <Route exact path="/map" component={MapPage} />
          <Route exact path="/requests" component={RequestsPage} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href='/home'>
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="map" href='/map'>
        <IonIcon icon={map} />
        <IonLabel>Map</IonLabel>
      </IonTabButton>

      <IonTabButton tab="requests" href='/requests'>
        <IonIcon icon={bookmark} />
        <IonLabel>Requests</IonLabel>
      </IonTabButton>

    </IonTabBar>
  </IonTabs>
);

export default TabsExample;