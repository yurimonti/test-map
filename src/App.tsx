import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonRouterOutlet, setupIonicReact, IonTabBar,
  IonTabButton,
  IonTabs, IonIcon,
  IonLabel
} from '@ionic/react';
import { ellipse, square, triangle } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import TabsExample from './components/TabsExample';
import AppContent from './AppContent';

setupIonicReact();

/* const prefersDark = window.matchMedia('(prefers-color-scheme: dark)'); */

const App: React.FC = () => (
  <IonReactRouter>
    <AppContent />
  </IonReactRouter>

);
{/* <IonApp>
    <IonReactRouter>
      <TabsExample />
    </IonReactRouter>
  </IonApp> 
<IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/map" component={MapPage} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp> */}
export default App;
