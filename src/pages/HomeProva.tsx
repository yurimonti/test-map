import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React from 'react'
import { Link } from 'react-router-dom';

const HomeProva: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>
                    <div>
                        <div>
                            <main >
                                <div >
                                    <h1 >
                                        <span>
                                            EPPOI{" "}
                                        </span>{" "}
                                        <span >
                                            Scopri la bellezza dell'entroterra
                                        </span>
                                    </h1>
                                    <p>
                                        <p >
                                            Crea, segui e condividi
                                        </p>{" "}
                                        percorsi nelle piccole realtà dell'entroterra
                                    </p>
                                    <div>
                                        <div>
                                            <Link
                                                to="/map"
                                            >
                                                Luoghi Disponibili
                                            </Link>
                                        </div>
                                        <div>
                                            <Link to="/map">
                                                Luoghi Disponibili
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
export default HomeProva;