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
            <IonContent fullscreen >
                <div>
                    <div>
                        <div>
                            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="sm:text-center lg:text-left">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                        <span className='block'>
                                            EPPOI{" "}
                                        </span>{" "}
                                        <span className="block text-indigo-600">
                                            Scopri la bellezza dell'entroterra
                                        </span>
                                    </h1>
                                    <span>
                                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                            Crea, segui e condividi
                                        </p>{" "}
                                        percorsi nelle piccole realtà dell'entroterra
                                    </span>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
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