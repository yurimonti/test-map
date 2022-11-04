import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <div className="container">
          <strong>Ready to create an app?</strong>
          <IonButton type='button' shape='round' fill='clear' routerLink='/map' >
            Map
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
